import React, { Component } from 'react';
import axios from 'axios';


const Form = (props) => {
  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form>
        <div>
          nimi: <input name="newName" value={props.newName} onChange={props.handler} />
        </div>
        <div>
          numero: <input name="newNum" value={props.newNum} onChange={props.handler} />
        </div>
        <div>
          <button type="submit" onClick={props.onSubmit}>lisää</button>
        </div>
      </form>
    </div>
  )
}

const Entries = (props) => {
  return (
    <div>
      <h2>Numerot</h2>
      <table>
        <thead></thead>
        <tbody>
          {props.persons.map(person =>
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td><button onClick={() => props.removeEntry(person.id)}>Poista</button></td>
            </tr>
          )
          }
        </tbody>
      </table>
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNum: '',
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:3001/api/persons')
      .then(res => {
        console.log(res.data)
        this.setState({
          persons: res.data
        })
      }
      ).catch(err => { console.log(err) })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.persons.filter(person => person.name === this.state.newName).length > 0) {
      alert("Tämä henkilö löytyy jo luettelosta!");
    } else if (this.state.newName === "" || this.state.newNum === "") {
      alert("Kentät eivät voi olla tyhjiä!")
    }
    else {
      //setting the new id to current date in milliseconds + the length of the array to avoid overlapping if old entries are removed
      axios.post('http://localhost:3001/api/persons', {
        name: this.state.newName,
        number: this.state.newNum,
      }).then(res => {
        this.setState({
          persons: [...this.state.persons, res.data],
          newName: "",
          newNum: "",
        })
      })
        .catch(err => { console.log(err) })
    }
  }

  handleRemove = (id) => {
    const currentPerson = this.state.persons.find(person => person.id === id);
    console.log(id)
    if (window.confirm('Poistetaanko ' + currentPerson.name + '?')) {
      axios.delete('http://localhost:3001/api/persons/' + id)
        .then(res => {
          const oldPersons = [...this.state.persons];
          const index = oldPersons.indexOf(currentPerson);
          if (index !== -1) {
            oldPersons.splice(index, 1);
            this.setState({ persons: oldPersons });
          }
        })
        .catch(err => { console.log(err) })
    }
  }

  render() {
    return (
      <div>
        <Form newName={this.state.newName} newNum={this.state.newNum} handler={this.handleChange} onSubmit={this.handleSubmit} />
        <Entries persons={this.state.persons} removeEntry={this.handleRemove} />
      </div>
    )
  }
}

export default App