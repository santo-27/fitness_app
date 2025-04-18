import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {Row} from 'react-bootstrap';
import './Header.css'
import './Home.module.css'

function TrainerHeader() {
  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">Fitrack</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">

            <Nav.Link as={Link} to="/trainerWorkout">Add new workout</Nav.Link>

              <Nav.Link as={Link} to="/assistant">Ai Assistant</Nav.Link>




                <Nav.Link as={Link} to='/progress'>Progress</Nav.Link>

                <Nav.Link as={Link} to="/login">Login</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
    
  );
}

export default TrainerHeader;