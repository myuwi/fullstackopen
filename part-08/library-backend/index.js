import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { v4 as uuid } from "uuid";
import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import "dotenv/config";

import Author from "./models/author.js";
import Book from "./models/book.js";

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

  type Query {
    allAuthors: [Author!]!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    bookCount: Int!
  }

  type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
  }
`;

const resolvers = {
  Query: {
    authorCount: async () => Author.countDocuments(),
    allAuthors: async () => Author.find({}),
    bookCount: async () => Book.countDocuments(),
    allBooks: async (_, args) => {
      // const predicates = [];
      //
      // if (args.author) {
      //   predicates.push((book) => book.author === args.author);
      // }
      // if (args.genre) {
      //   predicates.push((book) => book.genres.includes(args.genre));
      // }
      //
      // return books.filter((book) => predicates.every((pred) => pred(book)));
      return Book.find({});
    },
  },
  Mutation: {
    editAuthor: (_, args) => {
      const author = authors.find((author) => author.name === args.name);
      if (!author) return null;

      author.born = args.setBornTo;
      return author;
    },
    addBook: async (_, args) => {
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({
          name: args.author,
          id: uuid(),
        });
        author.save();
      }

      const book = new Book({
        ...args,
        author: author.id,
        id: uuid(),
      });
      await book.save();

      return book;
    },
  },
  Author: {
    bookCount: (root) =>
      books.filter((book) => book.author === root.name).length,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
