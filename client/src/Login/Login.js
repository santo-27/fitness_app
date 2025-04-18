import React, { useState ,useContext} from 'react'
import Header from '../Header'
// import Button from 'react-bootstrap/Button';
import {Form, Button, Row, Col} from 'react-bootstrap';
import axios from "axios";
import { redirect , useNavigate} from "react-router-dom";
import AuthContext from '../authContext';
import "./Login.css"
import loginImage from './assets/LoginPageImg.png';
import { Link } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    console.log('hey');
    const [message, setmsg] = useState('')
    const navigate = useNavigate();
    const { login, user, logout } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData.email, formData.password, "user");

        if(user && user.email){
          setmsg('Login successful');
          window.localStorage.setItem('email' , user.email);
          // return redirect('/home');
        }
        else{
          setmsg("incorrect password")
        }

        // try {
        //   const response = await axios.post('/login/form', formData);
        //   if(response.data.new_user){
        //     setmsg('NEW USER');
        //     navigate("/home");
        //   }
        //   else{
        //     if(response.data.pass_crct){
        //       setmsg('PASS CRCT');
        //       navigate("/home");
        //     }

        //     else{
        //       setmsg('pass wrong');
        //     }
        //   }
          
        //   console.log('Response:', formData);
        // } catch (error) {
        //   console.error('Error submitting form:', error);
        // }
      };

      const handleLogout = async (e) => {
        await logout();
        setmsg('')
      }

  return (
    
    <div className="main">
    <div >
        <Header />
        {!(user && user.email) ? (<div className='py-5 px-5 justify-content-center '>
        {/* <Row> */}
        {/* <Col md={6}> */}

         <div className='formDiv'>
         <div className="heading">
              Log In
         </div>
            <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className=''>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name='email' value={formData.email} onChange={handleChange}/>
           
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label >Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' value={formData.password} onChange={handleChange}/>
            
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
          <a href='/trainerLogin'>Trainer Login</a>
        <Button variant="primary" type="submit" className="larger-text-button">
            Submit
        </Button>
        {message && <p>{message}</p>}
        </Form>
        </div>
    {/* </Col> */}
 
    {/* </Row> */}
    </div>) : (
      <div className='Login-center'>
        <p>Do u wanna logout</p>
        <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>

      </div>  
      )}
      
    </div>

    <div className = "image">
      <img src={loginImage} alt="img not loaded"></img>
    </div>
    </div>
  )
}

export default Login;