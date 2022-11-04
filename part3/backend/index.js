const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Persona = require('./models/person')

const requestLogger = (req, res, next) => {
  console.log('Method: ', req.method)
  console.log('Path: ', req.path)
  console.log('Body: ', req.body)
  console.log('--------------')
  next()
}

app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(morgan('tiny'))
app.use(cors())

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.get('/api/persons', (req, res) => {
  Persona.find({}).then((persona) => res.json(persona))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Persona.findById(id)
    .then((persona) => {
      if (persona) {
        res.json(persona.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const persona = {
    name: body.name,
    number: body.number,
    _id: req.params.id,
  }

  Persona.findByIdAndUpdate(req.params.id, persona, { new: true })
    .then((updatePersona) => res.json(updatePersona.toJSON()))
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Persona.findByIdAndRemove(req.params.id)
<<<<<<< HEAD
    .then(() => res.status(204).end())
=======
    .then((result) => res.status(204).end())
>>>>>>> 0a814d2 (Ejercicio 4.1-4.2 completado)
    .catch((err) => next(err))
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name && !body.number) {
    return res.status(400).json({
      error: 'name and number missing',
    })
  }

  const persona = new Persona({
    name: body.name,
    number: body.number,
  })

  persona
    .save()
    .then((personaGuardada) => res.json(personaGuardada.toJSON()))
})

app.get('/info', (req, res) => {
  const date = new Date()
  Persona.find({}).then((p) => {
    res.send(
      `<h1>Phonebook has info for ${p.length} people<br/>${date}</>`
    )
  })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'Validation Error') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('Server running on port ', PORT)
})
