import morgan from "morgan";
import logger from "../utils/logger.js";

morgan.token("req-body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : "",
);

export const requestLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :req-body",
);

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

  res.sendStatus(500);
};
