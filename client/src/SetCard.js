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
    <div style={{backgroundColor:"#F8fafa"}}>
      {showForm ? (
        <div className='row ' >
      
        <form className='SetCardForm' onSubmit={handleSubmit}>

          

          <div style={{ display: "grid", placeItems: "center", height: "auto",  width: "fit-content",}}>
          <h4 className='col grey'>{props.set_no}.</h4>
          </div>
       
          
          
          <label className='mx-3'>
          <input name = "weight " placeholder='-' className='col SetCard-input' onChange={handleChange} style={{marginLeft:"35px"}}/> 
          </label>
        
         
        <label className='mx-3'>
          <input name="rep_count" placeholder='-' className = 'col SetCard-input' onChange={handleChange} /> 
        </label>
       
        <label className="form-check-label mx-3" for="flexCheckDefault">
          <input className="form-check-input col mx-2" type="checkbox" value="" id="flexCheckDefault" onChange={handleSubmit}/>
            
        </label>
       
        
        

        </form>
        
      </div>
      ) : (<div><p>set {props.set_no} is over</p></div>)}
      
    </div>
  )
}

export default SetCard