const mongoose = require('mongoose')
const credentials = require('./db_cred.json')

mongoose.connect(credentials.uri, {useNewUrlParser: true})

const args = process.argv.slice(2);


const Person = mongoose.model('Person', {
    name: String,
    number: String
})

if(args.length === 2){

const person = new Person({
    name: args[0],
    number: args[1],
})

person
    .save()
    .then(res => {
        console.log("Person saved!")
        mongoose.connection.close()
    })

} else if (args.length === 0) {    
    Person
    .find({})
    .then(result =>{
        console.log("Puhelinluettelo:")
        result.forEach(person => {
            console.log(person.name + " " + person.number)
        })
        mongoose.connection.close()
    })
}

else{
    console.log("Wrong number of arguments passed.")
    mongoose.connection.close()
}

