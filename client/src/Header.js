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
import logo from './Assets/navBar/logo.svg';



function Header() {
  return (
    // <div className="mainDivNavBar">
      <Navbar expand="lg" className="red-navbar">
        <Container fluid >
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
              <Nav.Link as={Link} to="/home">
              
              Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/log_workout">Log workout</Nav.Link>
              <Nav.Link as={Link} to="/assistant">Ai Assistant</Nav.Link>
              <Nav.Link as={Link} to="/Feedback">Feedback</Nav.Link>

              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to='/new_workout'>New Workout</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/progress'>Progress</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    // </div>
    
  );
}

export default Header;