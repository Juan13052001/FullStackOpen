const mongoose = require('mongoose')

const password = process.env.PASSWORD

const url = `mongodb+srv://Juan130501:${password}@cluster0.j50ru.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const personaSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Persona = mongoose.model('Persona', personaSchema)

const persona = new Persona({
  name: process.argv[3],
  number: process.argv[4],
})

persona.save().then((result) => {
  console.log(`Added ${process.argv[3]} ${process.argv[4]} to phonebook`)
  mongoose.connection.close()
})

Persona.find({}).then((result) => {
  result.forEach((note) => console.log(note))
  mongoose.connection.close()
})
