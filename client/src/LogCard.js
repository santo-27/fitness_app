import {React, useState} from 'react';
import axios from 'axios';
import SetCard from './SetCard';
import './LogCard.css'

function LogCard(props) {
    

    
  return (
    <div className='LogCard-card '>
        {/* <div class="dropdown"> */}
            <h2 className='LogCard-heading'>{props.data.workout}</h2>
            {/* <button className="btn btn-secondary dropdown-toggle w-50" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown button */}
            {/* </button> */}
            {/* <ul className="dropdown-menu"> */}
                {/* <li> */}
                {/* <div className="dropdown-item" > */}
                    {Array.from({ length: props.data.sets }).map((_, index) => {
                        return (
                                
                                <>
                                {index === 0 ? <div>
                                    <div className='Title'>
                                    <h4 >
                                    Set
                                    </h4>
                                    <h4 style={{textAlign:"center" ,position:"relative",left:"-5%"}} >
                                    Weight
                                    </h4>
                                    <h4 style={{textAlign:"center",position:"relative",left:"5%"}}>
                                    Reps
                                    </h4>
                                    <h4 style={{textAlign:"center" , textAlign:"right"}}>
                                    Completed
                                    </h4>

                                </div>
                                </div> : <></>}
                                
                                <SetCard data = {props.data} set_no = {index+1}/>
                                </>
                                )
                    })}
                {/* </div> */}
                    
                    {/* <a class="dropdown-item" href="#">Action</a> */}
                    
                {/* </li> */}
                
            {/* </ul> */}
        {/* </div> */}
    </div>
  )
}

export default LogCard