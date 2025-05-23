import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './authContext';
import About from './About/About.js';
import Home from './Home';
import Login from './Login/Login.js';
// import workoutInput from './workoutInput';
import NewWorkouts from './NewWorkouts';
import LogWorkout from './LogWorkout';
import Progress from './Progress.js';
import Assistant from './Assistant/Assistant.js';
import Feedback from './Feedback/Feedback.js';
import TrainerLogin from './Login/TrainerLogin.js';
import "./App.css";
import './Home.module.css';
import TrainerWorkoutForm from './TrainerWorkoutForm.js';
import TrainerProgress from './TrainerProgress.js';
import AdminLogin from './Login/AdminLogin.js';
import NewTrainer from './NewTrainer.js';
import AddNewUser from './AddNewUser.js';
import ViewData from './ViewData.js';

function App() {
  return (
    <div className='bg-color-App'>
     <AuthProvider>
      <Routes>
        <Route exact path = "/" element={<Login />}/>
        <Route path = "/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path='new_workout' element={<NewWorkouts/>} />
        <Route path='/log_workout' element={<LogWorkout />} />
        <Route path='/progress' element={<Progress />} />
        <Route path='/assistant' element={<Assistant />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path = "/trainerLogin" element={<TrainerLogin />} />
        <Route path='/trainerWorkout' element={<TrainerWorkoutForm />} />
        <Route path = "/trainerProgress" element={<TrainerProgress />} />
        <Route path = "/adminLogin" element={<AdminLogin />} />
        <Route path = "/addNewTrainer" element={<NewTrainer />} />
        <Route path = "/newUser" element={<AddNewUser />} />
        <Route path = "/viewData" element={<ViewData />} />
      </Routes>
      </AuthProvider>
    </div>
  )
}

export default App