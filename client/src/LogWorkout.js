import {React, useEffect} from 'react';
import axios from 'axios';
import { useContext, useState } from 'react';
import AuthContext from './authContext';
import Header from './Header';
import LogCard from './LogCard';
import './LogWorkout.css';
// import { unstable_useViewTransitionState } from 'react-router-dom';


function LogWorkout() {
  const {user} = useContext(AuthContext);
  const day_int = {
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4:'thursday',
    5: 'friday',
    6: 'saturday',
    7: 'sunday'
  }
  const d = new Date();
  let day = d.getDay();
  const [data, changeData] = useState([]);
  const [alertMsg, setMsg] = useState('')

  const get_data = async (email) => {
    //THIS WAS COMMENTED FOR THE SAKE OF FRONT END
    // const response = await axios.post("/workout_plan", {email:email})
    // return response.data
    // console.log(response.data)
    //END OF COMMENT


    //COMMENT THIS WHEN FRONT END GETS OVER
    var front_data = {
      "rows":[
    {
      "id": 1,
      "email": "alex.johnson@example.com",
      "day": "monday",
      "sets": 3,
      "reps": 12,
      "workout": "bench press"
    },
    {
      "id": 2,
      "email": "emily.davis@example.com",
      "day": "tuesday",
      "sets": 4,
      "reps": 10,
      "workout": "squats"
    },
    {
      "id": 3,
      "email": "michael.smith@example.com",
      "day": "wednesday",
      "sets": 3,
      "reps": 15,
      "workout": "deadlifts"
    },
    {
      "id": 4,
      "email": "sarah.wilson@example.com",
      "day": "thursday",
      "sets": 3,
      "reps": 12,
      "workout": "shoulder press"
    },
    {
      "id": 5,
      "email": "daniel.brown@example.com",
      "day": "friday",
      "sets": 4,
      "reps": 10,
      "workout": "pull-ups"
    },
    {
      "id": 6,
      "email": "olivia.jones@example.com",
      "day": "saturday",
      "sets": 3,
      "reps": 12,
      "workout": "bicep curls"
    },
    {
      "id": 7,
      "email": "ethan.taylor@example.com",
      "day": "sunday",
      "sets": 3,
      "reps": 12,
      "workout": "tricep dips"
    },
    {
      "id": 8,
      "email": "ava.martin@example.com",
      "day": "monday",
      "sets": 3,
      "reps": 15,
      "workout": "lunges"
    },
    {
      "id": 9,
      "email": "noah.thomas@example.com",
      "day": "wednesday",
      "sets": 3,
      "reps": 12,
      "workout": "lateral raises"
    },
    {
      "id": 10,
      "email": "mia.white@example.com",
      "day": "friday",
      "sets": 4,
      "reps": 10,
      "workout": "leg press"
    },
    {
      "id": 11,
      "email": "logan.hall@example.com",
      "day": "saturday",
      "sets": 3,
      "reps": 12,
      "workout": "chest fly"
    },
    {
      "id": 12,
      "email": "sophia.young@example.com",
      "day": "sunday",
      "sets": 3,
      "reps": 12,
      "workout": "romanian deadlifts"
    },
    {
      "id": 13,
      "email": "jacob.king@example.com",
      "day": "monday",
      "sets": 4,
      "reps": 10,
      "workout": "cable rows"
    },
    {
      "id": 14,
      "email": "isabella.scott@example.com",
      "day": "tuesday",
      "sets": 3,
      "reps": 12,
      "workout": "front squats"
    },
    {
      "id": 15,
      "email": "william.harris@example.com",
      "day": "wednesday",
      "sets": 3,
      "reps": 12,
      "workout": "shrugs"
    },
    {
      "id": 16,
      "email": "ella.adams@example.com",
      "day": "thursday",
      "sets": 3,
      "reps": 15,
      "workout": "hip thrusts"
    },
    {
      "id": 17,
      "email": "mason.lewis@example.com",
      "day": "friday",
      "sets": 4,
      "reps": 10,
      "workout": "seated row"
    },
    {
      "id": 18,
      "email": "grace.walker@example.com",
      "day": "saturday",
      "sets": 3,
      "reps": 12,
      "workout": "calf raises"
    },
    {
      "id": 19,
      "email": "james.allen@example.com",
      "day": "sunday",
      "sets": 3,
      "reps": 12,
      "workout": "hanging leg raises"
    },
    {
      "id": 20,
      "email": "charlotte.robinson@example.com",
      "day": "monday",
      "sets": 3,
      "reps": 15,
      "workout": "dumbbell lunges"
    }
  ]
  ,
      "nums_rows": 1
  }
  return front_data;

    

  }

  useEffect(() => {
    
    if(data.length < 1){
      get_data(user.email).then((res) => {
        if(res.nums_rows > 0){
          var raw_data = res.rows;
          var clean_data = []

          for(let i = 0; i < raw_data.length; i++ ){
            // console.log(raw_data[i].day == day_int[day])
            if(raw_data[i].day === day_int[day]){
              clean_data.push(raw_data[i])
            }
          }
          console.log(clean_data.length)
          changeData(clean_data)

        }
    

  })}}, [data])






  

  get_data()
  return (
    <div>
      <Header />
      <div style={{ marginTop: '20px' }}>
      <div style={{ marginLeft: '20%',marginRight:'20%' }} className='LogWorkoutWorkspace'>
        <h1>Log Workouts</h1>
        <div style={{ width: "calc(100% + 40px)",marginLeft:"-20px" ,marginRight:"20px"}}>
          <hr />
        </div>
    {user ? (
    
        
          data.length ? (
            <div>
              {data.map((item) => {
                return (
                  <LogCard data={item} />
                )
              })}
            </div>
          ):(
            <div>
              <p>You have not scheduled any workouts today</p>
            </div>
          )
        
      
    ):(
      <div>
        <h2>Please log in before continuing</h2>
      </div>
    )}
    </div>
    </div>
    </div>
    
  )
}

export default LogWorkout