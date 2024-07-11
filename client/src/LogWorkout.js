import {React, useEffect} from 'react';
import axios from 'axios';
import { useContext, useState } from 'react';
import AuthContext from './authContext';
import Header from './Header';
import LogCard from './LogCard';
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
    const response = await axios.post("/workout_plan", {email:email})
    // console.log(response.data)
    return response.data

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
    
  )
}

export default LogWorkout