import morgan from "morgan";
import jwt from "jsonwebtoken";

import config from "../utils/config.js";
import logger from "../utils/logger.js";

import User from "../models/user.js";

morgan.token("req-body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : "",
);

const noop = (_req, _res, next) => next();

export const requestLogger = () => {
  if (process.env.NODE_ENV === "test") {
    return noop;
  }

  return morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body",
  );
};

export const userExtractor = async (req, _, next) => {
  const token = req.get("authorization")?.split(" ")[1];

  if (token) {
    const decodedToken = jwt.verify(token, config.SECRET);
    req.user = await User.findById(decodedToken.id);
  }

  next();
};

export const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

export const errorHandler = (err, _req, res, _next) => {
  logger.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (
    err.name === "MongoServerError" &&
    err.message.includes("E11000 duplicate key error")
  ) {
    return res.status(400).json({ error: "expected `username` to be unique" });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "token expired" });
  }

  res.sendStatus(500);
};
