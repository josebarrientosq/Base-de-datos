const mongoose = require('mongoose')

const Schema = mongoose.Schema

let eventoSchema = new Schema({
  id: { type: Number, required: true, unique: true},
  title: { type: String, required: true },
  start: { type: Date, required: true},

  


 // allDay: { type: Boolean, required: false},
 // end_date: { type: Date, required: false},
 // end_hour: { type: Date, required: false},
 // start_hour: { type: Date, required: false},
 // iduser: { type: Date, required: false},
})

let EventoModelo = mongoose.model('evento', eventoSchema)

module.exports = EventoModelo
