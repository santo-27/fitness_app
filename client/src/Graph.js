import {React, useEffect, useState, useContext} from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
//we send here the id and allData
function Graph(props) {


    const [data, setData] = useState(['asd'])

    const {user} = useContext(AuthContext)

    const getWorkoutData = async (email, workout) => {
        await axios.post('/workoutdata', {email:email, workout:workout}).then(res => {
            setData(res.data.response.rows)
            console.log(data)
        })

    }

    var dataset = {
      labels: [],
      datasets: [
      {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [],
      },
      ],
      };

    useEffect(() => {
        if(data.length == 0) {
            getWorkoutData('candyman270705@gmail.com', props.workout)
            console.log('hello')
            for(let i = data.length - 1; i >= 0; i++){
              dataset.labels.push(data[i].date)
              dataset.datasets[0].data.push(data[i].weight * data[i].reps)
        
            }
        }
    }, [data])



    


  return (
    data.length ? (
      <div>
        <Line data={dataset} />
    </div>
  ) : (
    <div></div>
  )
    )
    
}

export default Graph