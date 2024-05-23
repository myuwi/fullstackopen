import express from "express";
import morgan from "morgan";

const PORT = 3001;

const app = express();
app.use(express.json());
morgan.token("req-body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : "",
);
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body",
  ),
);

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

app.get("/api/persons", (_, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) {
    return res.sendStatus(404);
  }

  res.json(person);
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }

  if (persons.some((p) => p.name === name)) {
    return res.status(409).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: Math.floor(Math.random() * 2 ** 16),
    name,
    number,
  };

  persons.push(person);

  res.json(person);
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
