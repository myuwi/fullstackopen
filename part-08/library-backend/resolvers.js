import { GraphQLError } from "graphql";
import { v4 as uuid } from "uuid";
import { PubSub } from "graphql-subscriptions";

import Author from "./models/author.js";
import Book from "./models/book.js";
import User from "./models/user.js";

const pubsub = new PubSub();

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

      const populatedBook = await book.populate("author");
      pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });

      return populatedBook;
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root.id }),
  },
};

export default resolvers;
