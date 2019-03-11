import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  handleChange = (event) => {
    this.setState({ newName: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      persons: [...this.state.persons, { name: this.state.newName }],
      newName: ""
    })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleChange} />
          </div>
          <div>
            <button type="submit" onClick={this.handleSubmit}>lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {this.state.persons.map(person => <div>{person.name}</div>)}
      </div>
    )
  }
}

export default App