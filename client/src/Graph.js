import {React, useEffect, useState, useContext} from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import Chart from "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js";
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

    var xyValues = []

    for(let i = data.length - 1; i >= 0; i++){
        xyValues.push({x:data[i].date, y:(data[i].weight * data[i].reps)})
    }


    const chart =  new Chart("myChart", {
        type: "scatter",
        data: {
          datasets: [{
            pointRadius: 4,
            pointBackgroundColor: "rgba(0,0,255,1)",
            data: xyValues
          }]
        }
        
      });
  return (
    <div>
        <canvas id="chart" style="width:100%;max-width:700px">

        </canvas>
    </div>
  )
}

export default Graph