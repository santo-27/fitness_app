import React from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import AuthContext from './authContext';
// import Button from 'react-bootstrap/Button';


function WorkoutInput() {
  const navigate = useNavigate()
  const {user} = useContext(AuthContext);
  const [formdata, setFormData] = useState({
    email: user.email,
    name: "",
    set: 0,
    rep: 0
  })
  
  console.log(formdata)
  const handleSubmit = async (e) =>{
    console.log("triggering")
    e.preventDefault();
    console.log("triggering")
    const mail = formdata.email;
    const name = formdata.name;
    const set = parseInt(formdata.set);
    const rep = parseInt(formdata.rep);
    const response = await axios.post('/newworkout', {email:mail, name:name , set:set, rep:rep});
    
      
    
  }

  // const get_data = async (email) => {
  //   const response = await axios.get("/workout_plan", email);
  //   return response
  // }
  // const data = {};
  // if(user){
  //   const data = get_data(user.email);
  //   if(data.rowCount > 0){
  //     setStatus(false);
  //   }
  
  // }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formdata,
      [name] : value
    })
  }

  return (
    <div>
        
        <Form onSubmit={handleSubmit}>
          <Col>
            <Form.Group as={Row} className="mb-3" >
                <Form.Label>workout name</Form.Label>
                <Form.Control type="text" name='name' placeholder="Enter the workout name here" onChange={handleChange}/>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" >
                <Form.Label>sets:</Form.Label>
                <Form.Control type="text" name='set' placeholder="Enter the num sets here" onChange={handleChange}/>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" >
                <Form.Label>goal reps:</Form.Label>
                <Form.Control type="text" name='rep' placeholder="Enter the num reps here" onChange={handleChange}/>
            </Form.Group>
            <Button variant="success" type="submit" >Submit</Button>
            </Col>
        </Form>

    </div>
  )
}

export default WorkoutInput;