import {React, useContext, useState, useEffect} from 'react'
import Header from './Header'
import axios from 'axios'
import AuthContext from './authContext'
import Graph from './Graph'


function Progress() {
    const {user} = useContext(AuthContext)
    
    const [data, setData] = useState( () => new Set());

    const [allData, setAllData] = useState([]);
    console.log(user);
    const get_all_workouts = async (email, d) => {
        var raw_workouts = []
        try{
            const response =  await axios.post("/workout_plan", {email:email})
            raw_workouts = response.data.rows;
            setAllData(raw_workouts);
        }
        
        
        catch(err){
            console.log(err)
        }
        // const raw_workouts = res.data.rows;
        let clean_workouts = new Set();

        for(let i = 0; i < raw_workouts.length; i++){
            clean_workouts.add(raw_workouts[i].workout);
        }
        setData(new Set(clean_workouts));

        // return clean_workouts



    }
    useEffect(() => {
        if(data.size == 0){
            get_all_workouts(user.email, data)
            // console.log(data)
            //     setData(ret);
            //     console.log(data)
            
            // setData(new Set(["a"]));
    }}
    , [data])
    
    // console.log(data)

  return (
    <div>
        <Header />
        {data.size ? (
            Array.from(data).map((item) => {
                return (
                    <Graph workout = {item} data = {allData} /> 
                )
            })
        ):(<div></div>)

        }
    </div>
  )
}

export default Progress