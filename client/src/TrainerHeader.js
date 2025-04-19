import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {Row} from 'react-bootstrap';
import './Header.css';
import './Home.module.css';
import logo from './Assets/navBar/logo.svg';


function TrainerHeader() {
  return (
    <div>
      <Navbar expand="lg" className="red-navbar">
        <Container fluid>
        <Navbar.Brand href="#home" className="navbar-brand-custom d-flex align-items-center">
  <img
    src={logo}
    alt="Logo"
    width="40"
    height="40"
    className="me-2"
  />
  <span className="brand-text">Fitrack</span>
</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                <Nav.Link as={Link} to="/trainerWorkout">Add new workout</Nav.Link>
                <Nav.Link as={Link} to="/newUser">Add New User</Nav.Link>
                <Nav.Link as={Link} to="/viewData">View User Info</Nav.Link>
                <Nav.Link as={Link} to='/trainerProgress'>Progress</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
    
  );
}

export default TrainerHeader;