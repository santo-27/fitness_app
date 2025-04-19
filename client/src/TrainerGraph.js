import {React, useEffect, useState, useContext} from 'react';
import axios from 'axios';

import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "./Graph.css"
//we send here the id and allData
function TrainerGraph(props) {


    const [workout_data, setWData] = useState([]);

    const user = props.user;

    const getWorkoutData = async (email, workout) => {
      
        const res = await axios.post('/workoutdata', {email:email, workout:workout});
        
        return await res.data.response.rows
  
      
            
       

    }

    const [dataset, setDataset] = useState({
      labels: [],
      datasets: [
      {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [],
      },
      ],
      });

    useEffect(() => {
        if(user && props.workout) {
            getWorkoutData(user.email, props.workout).then(resp => {
              // var res_2 = res
              setWData(resp)
              
              
            })
            // setData(res)
              // console.log(workout_data)
              
            }
            
        
    }, [user && props.workout])

    useEffect(() => {
      if (workout_data.length > 0) {
        console.log(workout_data)
        var temp = {
          labels: [],
          datasets: [
          {
          label: "progress",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: [],
          },
          ],
          }
          console.log(dataset)
        for(let i = workout_data.length - 1; i >= 0; i--){
            temp.labels.push(workout_data[i].date)
            temp.datasets[0].data.push(workout_data[i].weight * workout_data[i].reps)
    
        }
        setDataset(temp)
        console.log(temp)
      }

    }, [workout_data])
    


    


  return (
    workout_data.length ? (
      <div className='Graph-graph-canvas'>
        <h3 className='inconsolata'>{props.workout} :</h3>
        <Line data={dataset} />
      </div>
  ) : (
    <div></div>
  )
    )
    
}

export default TrainerGraph