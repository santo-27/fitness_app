import React from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import AuthContext from './authContext';
import Header from './Header';
import { useSessionStorage } from 'usehooks-ts';

function NewWorkouts() {
    // const navigate = useNavigate()
    const {user} = useContext(AuthContext);
    // const mail_id = user.email;
    // const email = window.localStorage.getItem('email')
    const [formdata, setFormData] = useState({
      email: user.email,
      name: "",
      day: '',
      set: 0,
      rep: 0
    })
    const [msg, setMsg] = useState('');
    
    console.log(formdata)
    const handleSubmit = async (e) =>{
      console.log("triggering")
      e.preventDefault();
      console.log("triggering")
      const mail = formdata.email;
      const name = formdata.name;
      const set = parseInt(formdata.set);
      const rep = parseInt(formdata.rep);
      //COMMENTED FOR THE SAKE OF FRONT END
      const response = await axios.post('/newworkout', {email:mail, name:name , set:set, rep:rep, day:formdata.day});
      //END OF COMMENT
      setMsg("posted the workout")
        
      
    }
 
    const handleChange = (e) => {
      const {name, value} = e.target;
      setFormData({
        ...formdata,
        [name] : value
      })
    }
  
    return (
      <div>
          <Header/>
          <div className='m-5'>
          <Form onSubmit={handleSubmit}>
            <Col>
              <Form.Group as={Row} className="mb-3 w-50" >
                  <Form.Label>workout name:</Form.Label>
                  <Form.Control type="text" name='name' placeholder="Enter the workout name here" onChange={handleChange}/>
              </Form.Group>
              <Form.Group as={Row} className="mb-3 w-25" >
                  <Form.Label>Day :</Form.Label>
                  <Form.Control type="text" name='day' placeholder="Enter the num reps here" onChange={handleChange}/>
              </Form.Group>
              <Form.Group as={Row} className="mb-3 w-25" >
                  <Form.Label>sets:</Form.Label>
                  <Form.Control type="text" name='set' placeholder="Enter the num sets here" onChange={handleChange}/>
              </Form.Group>
              <Form.Group as={Row} className="mb-3 w-25" >
                  <Form.Label>goal reps:</Form.Label>
                  <Form.Control type="text" name='rep' placeholder="Enter the num reps here" onChange={handleChange}/>
              </Form.Group>
              
              <Button variant="success" type="submit" >Submit</Button>
              </Col>
          </Form>
          {msg && <p>{msg}</p>}
          </div>
      </div>
    )
}

export default NewWorkouts