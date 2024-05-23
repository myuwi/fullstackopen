import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import Person from "./models/person.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
morgan.token("req-body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : "",
);
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body",
  ),
);

app.use(express.static("dist"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (_, res) => {
  const date = new Date();
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `);
});

app.get("/api/persons", async (_, res) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) {
    return res.sendStatus(404);
  }

  res.json(person);
});

app.post("/api/persons", async (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }

  try {
    if (await Person.exists({ name })) {
      return res.status(409).json({
        error: "name must be unique",
      });
    }

    const person = new Person({
      name,
      number,
    });

    const newPerson = await person.save();

    res.json(newPerson.toJSON());
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.sendStatus(204);
});

const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
