import morgan from "morgan";
import logger from "../utils/logger.js";

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

  res.sendStatus(500);
};
