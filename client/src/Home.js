import {React, useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import Header from './Header'
import WorkoutInput from './workout_input';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import AuthContext from './authContext';
import GoalShow from './GoalShow/GoalShow';
import HomeCSS from './Home.module.css';
import "./Home.css";




function Home() {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [new_user, setStatus] = useState(true);
  const[res, setRes] = useState([]);
  const days= ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const get_data = async (email) => {
    //THIS WORKS FINE (COMMENTING FOR THE SAKE OF FRONTEND)
    const response = await axios.post("/workout_plan", {email:email})
    console.log( response.data)
    return response.data

    //UNCOMMENT WHEN FRONTEND IS COMPLETED
    var front_data = {
      "rows":[
    {
      "id": 1,
      "email": "alex.johnson@example.com",
      "day": "Monday",
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
      "day": "Monday",
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
      "day": "Monday",
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
      "day": "Monday",
      "sets": 3,
      "reps": 15,
      "workout": "dumbbell lunges"
    }
  ]
  ,
      "nums_rows": 1
  }
  return front_data
  

    //END
    

  
  }
  // var res = [];
  
  
  // console.log(res)
  
  

  useEffect( () => {
    if(user){
    
      get_data(user.email).then(response => {
     
        setRes(response.rows);

        


        if(parseInt(response.nums_rows) > 0){
          setStatus(false);
          
      }
      })
      
  }
  }, [new_user])
  
  // const [message, setmsg] = useState("");
  
  var count = 0;

  
  

  
  return (
    <div className="mainDiv">
        
        <Header/>
        <div className='workSpace'>
        {user ? ( new_user ? (
          <div>
            <h1>hello new user</h1>
          </div>
        ) : (
          <div className='mainDiv'>
            <h2 className={HomeCSS.heading}>Workout Plan</h2>
            {/* <ol class="list-group list-group-numbered"> */}
            {days.map((day, j) => {
              // return 
              count = 0;
                return(
                  <div className="daySection">
                    <div><p className='daySection day'>{day} </p></div>
                    <div className='daySection content'>
                    {
                      res.map((item, i) => {
                        if(item.day === day){
                          return (
                            <div className = "dayContent">
                            <GoalShow data={item} index={i} />
                            </div>
                          )
                        }}
                    )}
                    </div>
                  </div>
                )})}

                
                  
                  
                  
             
            {/* </ol> */}
          </div>
        )):
          
          
          

        
          
       (
        <div>
        <h1>Please log in to access the site.</h1>
        
        </div>
      )} 
      </div>
        
        
        
    </div>
  )
}

export default Home