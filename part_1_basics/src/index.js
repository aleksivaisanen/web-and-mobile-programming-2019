import React from 'react';
import ReactDOM from 'react-dom';


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
    return (
        <p>Total {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} exercises</p>
    )
}

const App = () => {
    const course = {
        name: 'Superadvanced web and mobile programming',
        parts: [
            {
                name: 'Basics of React',
                exercises: 8
            },
            {
                name: 'Using props',
                exercises: 10
            },
            {
                name: 'Component states',
                exercises: 12
            }
        ]
    }
    return (
        <div>
            <Header course={course.name} />
            <Contents parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
