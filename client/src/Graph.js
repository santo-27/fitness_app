import {React, useEffect, useState, useContext} from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
//we send here the id and allData
function Graph(props) {

    // const data = props.data;
    const [data, setData] = useState([])
    // const refined = [];
    const {user} = useContext(AuthContext)



    // for(let i = 0; i < data.length; i++){
    //     if(data[i].workout ===  props.workout){
    //         refined.push(data[i])

    //     }

    // }
    const getWorkoutData = async (email, workout) => {
        await axios.post('/workoutdata', {email:email, workout:workout}).then(res => {
            setData(res.data.rows)
        })

    }

    useEffect(() => {
        if(data.length == 0) {
            getWorkoutData(user.email, props.workout)
        }
    }, [data])

    // var xyValues = []
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

    for(let i = data.length - 1; i >= 0; i++){
      dataset.labels.push(data[i].date)
      dataset.datasets[0].data.push(data[i].weight * data[i].reps)
        // xyValues.push({x:data[i].date, y:()})
    }


    // const chart =  new Chart("chart", {
    //     type: "scatter",
    //     data: {
    //       datasets: [{
    //         pointRadius: 4,
    //         pointBackgroundColor: "rgba(0,0,255,1)",
    //         data: xyValues
    //       }]
    //     }
        
    //   });
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