const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("combined"));

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1,
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2,
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3,
    },
    {
        name: "Juan",
        number: "9211427924",
        id: 4,
    },
    {
        name: "Kathia",
        number: "9211427924",
        id: 5,
    },
];

const generateId = () => {
    const idRandom = Math.floor(Math.random() * 10000) + 1;
    return idRandom;
};

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/info", (req, res) => {
    const date = new Date();
    res.send(
        `<h1>Phonebook has info for ${persons.length} people</h1> <p>${date}</p>`
    );
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const persona = persons.find((persona) => persona.id === id);

    res.json(persona);
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter((persona) => persona.id !== id);
    res.status(204).end();
});

app.post("/api/persons", (req, res) => {
    const body = req.body;

    console.log(body);
    if (!body.name && !body.number) {
        return res.status(400).json({
            error: "content missing",
        });
    }
    const findPerson = persons.find((persona) => persona.name === body.name);
    if (findPerson) {
        return res.status(400).json({
            error: "Name must be unique",
        });
    }
    const persona = {
        name: body.name,
        number: body.number,
        id: generateId(),
    };
    persons = persons.concat(persona);
    res.json(persons);
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log("Server running");
});
