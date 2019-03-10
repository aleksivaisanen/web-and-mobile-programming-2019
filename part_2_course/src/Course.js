import React, { Component } from 'react';

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}
const Contents = (props) => {
    return (
        <div>
            {props.parts.map(pt =>
                <Part part={pt.name} exercise={pt.exercises} />
            )}
        </div>
    )
}

const Part = (props) => {
    return (
        <p>{props.part} {props.exercise}</p>
    )
}


const Total = (props) => {

    let total = 0;
    props.parts.forEach(element => {
        total += element.exercises;
    });

    return (
        <p>Total {total} exercises</p>
    )
}

class Course extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render(){
        return(
            <div>
                <Header course={this.props.course.name} />
                <Contents parts={this.props.course.parts} />
                <Total parts={this.props.course.parts} />
            </div>
        )
    }

}

export default Course;