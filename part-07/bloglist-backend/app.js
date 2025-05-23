import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import "express-async-errors";

import config from "./utils/config.js";
import logger from "./utils/logger.js";
import * as middleware from "./utils/middleware.js";

import blogsRouter from "./controllers/blogs.js";
import loginRouter from "./controllers/login.js";
import usersRouter from "./controllers/users.js";
import testingRouter from "./controllers/testing.js";

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("connected to MongoDB"))
  .catch((err) => logger.error("error connecting to MongoDB:", err.message));

const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger());
app.use(middleware.userExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
