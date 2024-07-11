import {React, useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import Header from './Header'
import WorkoutInput from './workout_input';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import AuthContext from './authContext';
import GoalShow from './GoalShow/GoalShow';
import HomeCSS from './Home.module.css'

// import Idiot from './idiot_error';



function Home() {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [new_user, setStatus] = useState(true);
  const[res, setRes] = useState([]);
  const days= ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const get_data = async (email) => {
    const response = await axios.post("/workout_plan", {email:email})
    // console.log(response.data)
    return response.data

  
  }
  // var res = [];
  
  
  console.log(res)
  
  

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
    <div>
        
        <Header/>
        
        {user ? ( new_user ? (
          <div>
            <h1>hello new user</h1>
          </div>
        ) : (
          <div >
            <h2 className={HomeCSS.heading}>Your plan for the day is:</h2>
            {/* <ol class="list-group list-group-numbered"> */}
            {days.map((day, j) => {
              // return 
              count = 0;
              
                
                return(
                  <div>
                    <div><p className='Home-day-style motserrrat'>{day} : </p></div>
                    {
                      res.map((item, i) => {
                        if(item.day === day){
                          return (
                            <div>
                            <GoalShow data={item} index={i} />
                            </div>
                          )
                        }}
                    )}
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
  )
}

export default Home