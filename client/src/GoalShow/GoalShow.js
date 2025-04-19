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
    <div className="content1 bg-white">
    <div key = {props.index}>
        {/* <li className="list-group-item d-flex justify-content-between align-items-start card w-50" > */}
        {/* <div className="ms-2 me-auto"> */}
        <div className='bg-white'>
            <div className="bg-white">Workout : {props.data.workout}</div>
            Sets : {props.data.sets}<br/>
            {/* <span className="badge text-bg-primary rounded-pill">Reps :{props.data.reps}</span> */}
            <span className='bg-white'>Reps :{props.data.reps}</span>
        </div>
        {/* <br/> */}
        
        {/* </li> */}
    </div>
    </div>
  )
}

export default GoalShow