const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then((result) => console.log('Conectado a MongoDB'))
  .catch((err) => console.log(err))

const personaSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 3 },
  number: { type: String, required: true, minlength: 8 },
})

personaSchema.plugin(uniqueValidator)

personaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Persona', personaSchema)
