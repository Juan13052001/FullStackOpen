const personaRouter = require("express").Router();

const Persona = require("../models/person");

personaRouter.get("/", (req, res) => {
    Persona.find({}).then((persona) => res.json(persona));
});

personaRouter.get("/:id", (req, res, next) => {
    const id = req.params.id;
    Persona.findById(id)
        .then((persona) => {
            if (persona) {
                res.json(persona.toJSON());
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => next(err));
});

personaRouter.put("/:id", (req, res, next) => {
    const body = req.body;

    const persona = {
        name: body.name,
        number: body.number,
        _id: req.params.id,
    };

    Persona.findByIdAndUpdate(req.params.id, persona, { new: true })
        .then((updatePersona) => res.json(updatePersona.toJSON()))
        .catch((err) => next(err));
});

personaRouter.delete("/:id", (req, res, next) => {
    Persona.findByIdAndRemove(req.params.id)
        .then(() => res.status(204).end())
        .catch((err) => next(err));
});

personaRouter.post("/", (req, res) => {
    const body = req.body;

    if (!body.name && !body.number) {
        return res.status(400).json({
            error: "name and number missing",
        });
    }

    const persona = new Persona({
        name: body.name,
        number: body.number,
    });

    persona
        .save()
        .then((personaGuardada) => res.json(personaGuardada.toJSON()));
});

module.exports = personaRouter;
