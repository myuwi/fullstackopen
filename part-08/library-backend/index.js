import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import express from "express";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import "dotenv/config";

import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";

import User from "./models/user.js";

mongoose.set("strictQuery", false);

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = 4000;

console.log("connecting to", MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.error("error connecting to MongoDB:", err.message));

(async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({ server: httpServer, path: "/" });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
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
    }),
  );

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`),
  );
})();
