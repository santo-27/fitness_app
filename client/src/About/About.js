import React from 'react'
import Header from '../Header'
import {Row, Col} from "react-bootstrap"

function About() {
  return (
    <div className=''>
        <Header />
        <div >
        <Row>
        <h1 className='d-flex justify-content-center'>About us:</h1>
        </Row>
        <Row>
        <p className='d-flex justify-content-center px-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu lacinia turpis. Mauris blandit, ipsum a lobortis fringilla, orci nulla dignissim urna, nec facilisis lorem libero id lectus. Donec vel molestie odio, eu dignissim sem. Nam lobortis dignissim egestas. Proin at leo nibh. Donec commodo eleifend bibendum. Quisque magna quam, gravida ultricies aliquet non, tempus et ligula. Nulla cursus tempor condimentum. Morbi id cursus tortor. Maecenas lobortis quis arcu vel rhoncus. Mauris vel diam nec leo luctus congue id id lectus. Quisque fermentum nulla tincidunt pretium sagittis. Quisque sed suscipit magna, vestibulum condimentum ante. Aenean vestibulum lacinia mauris ut aliquam. Etiam efficitur mi id nisl vestibulum vulputate.
        </p>
        </Row>
        </div>

        
    </div>
  )
}

export default About