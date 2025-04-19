import React from 'react'
import Header from '../Header'
import { Container, Row, Col } from 'react-bootstrap'
import './About.css'
import HomeCSS from '../Home.module.css'

function About() {
  return (
    <div>
      <Header />
      <div className="about-container bg-light py-2">
        <Container>
          <Row className="mb-4 text-center">
            <Col>
              <h2 className={HomeCSS.heading}>About Us</h2>
              <p className="lead text-muted">
                Discover how our fitness tracker empowers you to achieve your health goals every day.
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <h3 className="mb-3 text-blue-700">Our Mission</h3>
              <p className='text-gray-700'>
                At FitTrack, we're passionate about making fitness accessible, engaging, and fun. Our mission is to provide intuitive tools that help you stay motivated and informed on your journey to better health.
              </p>

              <h3 className="mt-4 mb-3 text-blue-700">What We Offer</h3>
              <ul className="list-unstyled text-gray-700">
                <li>👉 Real-time activity tracking</li>
                <li>👉 Customizable goals</li>
                <li>👉 Community support</li>
                <li>👉 Detailed analytics and progress reports</li>
              </ul>

              <h3 className="mt-4 mb-3 text-blue-700">Join Our Community</h3>
              <p className='text-gray-700'>
                Join thousands of fitness enthusiasts who trust FitTrack to guide them. Whether you’re a beginner or a pro, our platform adapts to your needs, helping you stay on track and celebrate every milestone.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default About;
