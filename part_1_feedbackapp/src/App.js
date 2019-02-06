import React, { Component } from 'react';
import './App.css';

const Button = (props) => {
  return (
    <button onClick={props.handler} >{props.value}</button>
  )
}
const Statistic = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  )
}
const Statistics = (props) => {
  const state = props.state;
  return (
    <table>
      <tbody>
        <Statistic name="positive" value={state.positive} />
        <Statistic name="neutral" value={state.neutral} />
        <Statistic name="negative" value={state.negative} />
        <Statistic name="average" value={props.avg} />
        <Statistic name="positive percentage" value={props.pos} />
      </tbody>
    </table>
  )
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      positive: 0,
      neutral: 0,
      negative: 0,
    }
  }

  handler = (value) => {
    this.setState({
      [value]: this.state[value] + 1
    })
  }

  average = () => {

    const ans = (this.state.positive - this.state.negative) / (this.state.positive + this.state.neutral + this.state.negative)

    if (isNaN(ans)) {
      return 0;
    } else {
      return Math.floor(ans * 1000) / 1000;
    }
  }

  positivePercentage = () => {
    const ans = this.state.positive / (this.state.positive + this.state.negative + this.state.neutral);
    if (isNaN(ans)) {
      return 0;
    } else {
      return Math.floor(ans * 1000) / 10 + "%";
    }
  }

  renderStatistics = () => {
    if (this.state.positive === 0 && this.state.neutral === 0 && this.state.negative === 0) {
      return (<p>No feedback has been given yet</p>)
    } else {
      return (<Statistics state={this.state} avg={this.average()} pos={this.positivePercentage()} />)
    }
  }


  render() {
    return (
      <div className="App">
        <h1>give feedback</h1>
        <Button handler={() => this.handler("positive")} value={"positive"} />
        <Button handler={() => this.handler("neutral")} value={"neutral"} />
        <Button handler={() => this.handler("negative")} value={"negative"} />
        <h1>statistics</h1>
        {this.renderStatistics()}
      </div>
    );
  }
}

export default App;
