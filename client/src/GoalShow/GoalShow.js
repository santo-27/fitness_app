import React from 'react'
import GoalShowCSS from './GoalShow.css';

function GoalShow(props) {
    console.log(props);
    // const styles = {
    //   borderRadius: "5px",
    //   margin: "10px",
    //   backgroundColor: "cyan"
      
  // };
  return (
    <div>
    <div key = {props.index}>
        <li className="list-group-item d-flex justify-content-between align-items-start card w-50" >
        <div className="ms-2 me-auto">
            <div className="">Name of the Workout: {props.data.workout}</div>
            Number of sets - {props.data.sets}
        </div>
        <span className="badge text-bg-primary rounded-pill">{props.data.reps}</span>
        </li>
    </div>
    </div>
  )
}

export default GoalShow