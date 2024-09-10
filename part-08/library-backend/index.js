import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import { v4 as uuid } from "uuid";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
mongoose.set("strictQuery", false);
import "dotenv/config";

import Author from "./models/author.js";
import Book from "./models/book.js";
import User from "./models/user.js";

// For better LSP and formatter support...
const gql = String.raw;

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.error("error connecting to MongoDB:", err.message));

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    allAuthors: [Author!]!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    bookCount: Int!
    me: User
  }

  type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    authorCount: async () => Author.countDocuments(),
    allAuthors: async () => Author.find({}),
    bookCount: async () => Book.countDocuments(),
    allBooks: async (_, args) => {
      const author =
        args.author && (await Author.findOne({ name: args.author }));

      if (args.author && !author) return [];

      const opts = {
        ...(args.author && { author: author.id }),
        ...(args.genre && { genres: { $elemMatch: { $eq: args.genre } } }),
      };

      return Book.find(opts).populate("author");
    },
    me: (_root, _args, ctx) => ctx.currentUser,
  },
  Mutation: {
    editAuthor: async (_, args, ctx) => {
      if (!ctx.currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) return null;

      author.born = args.setBornTo;
      await author.save();

      return author;
    },
    addBook: async (_, args, ctx) => {
      if (!ctx.currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({
          name: args.author,
          id: uuid(),
        });

        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError("Adding author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }

      const book = new Book({
        ...args,
        author: author.id,
        id: uuid(),
      });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Adding book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      return book.populate("author");
    },
    createUser: async (_, args) => {
      const user = new User(args);

      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError("Creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      }

      return user;
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root.id }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET,
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
