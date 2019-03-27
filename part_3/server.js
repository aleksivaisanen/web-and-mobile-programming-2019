const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

const formatPerson = (person) => {
    const formattedPerson = { ...person._doc, id: person._id }
    delete formattedPerson._id
    delete formattedPerson.__v
    return formattedPerson
}

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(result => {
            const formattedResult = result.map(person => formatPerson(person))
            res.json(formattedResult)
        })
})


app.get('/api/persons/:id', (req, res) => {
    Person
    .findOne({_id: req.params.id}, (error, person) => {
        if(error){
            console.log(error)
            res.status(404).end()
        }else{
            res.json(formatPerson(person))
        }
    })
})

app.delete('/api/persons/:id', (req, res) => {
    Person
        .findByIdAndRemove(req.params.id, (error) => {
            if(error){
                console.log(error)
            }
            res.status(204).end()
        })

})


app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({ error: "Content missing!" })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(savedPerson => {
            console.log(formatPerson(savedPerson))
            res.json(formatPerson(savedPerson))
        })

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
