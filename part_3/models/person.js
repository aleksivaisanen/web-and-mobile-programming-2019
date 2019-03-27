const mongoose = require('mongoose')
const credentials = require('../db_cred.json')

mongoose.connect(credentials.uri, { useNewUrlParser: true })

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

module.exports = Person