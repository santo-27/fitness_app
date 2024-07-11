import {React, useState, useContext} from 'react';
import "./SetCard.css";
import axios from 'axios';
import AuthContext from './authContext';


// We are occasionally facing an error where we loose context after checking this form , This might be because we are oddly using the checkbox to submit , this might cause refreshing;



function SetCard(props) {
  const {user} = useContext(AuthContext)
  const [formdata, setForm] = useState({
    workout : "",
    weight : 0,
    set_no : 0,
    rep_count: 0
})
const [showForm, setShowForm] = useState(true)

    const handleSubmit = async (event) => {
        console.log("submitted");
        setShowForm(false);
        try{
          console.log(formdata)
          await axios.post('/logWorkout', {
          workout: props.data.workout,
          weight: formdata.weight,
          set_no: props.set_no,
          rep_count : formdata.rep_count,
          email: user.email
          })
        }
        catch(err){
          console.log(err);
        }
        
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setForm({
            ...formdata,
            [name]:  value
        })
    }


    

  return (
    <div >
      {showForm ? (
        <div className='row m-2'>
      
        <form onSubmit={handleSubmit}>
        <h3 className='col'>{props.set_no}</h3>
          <label className="form-check-label mx-3" for="flexCheckDefault">
          <input className="form-check-input col mx-2" type="checkbox" value="" id="flexCheckDefault" onChange={handleSubmit}/>
            completed
          </label>
          <label className='mx-3'>weight: 
          <input name = "weight" placeholder='weight' className='col SetCard-input' onChange={handleChange}/>
          </label>
        <label className='mx-3'>
          reps: <input name="rep_count" placeholder='reps' className = 'col SetCard-input' onChange={handleChange}/>
        </label>
        
        

        </form>
        
      </div>
      ) : (<div><p>set {props.set_no} is over</p></div>)}
      
    </div>
  )
}

export default SetCard