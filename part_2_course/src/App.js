import React from 'react';
import Course from './Course';

const App = () => {
    const course = {
        name: 'Superadvanced web and mobile programming',
        parts: [
            {
                name: 'Basics of React',
                exercises: 8,
                id: 1
            },
            {
                name: 'Using props',
                exercises: 10,
                id: 2
            },
            {
                name: 'Component states',
                exercises: 12,
                id: 3
            },

        ]
    }
    return (
        <div>
            <Course course={course} />
        </div>
    )
}

export default App;