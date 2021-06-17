import React from 'react'
import {Spinner} from 'react-bootstrap'
import './Spinner.css'

const Load = () => {
    return (
        <div className='load'>
<Spinner animation="border" variant="secondary" />
  <Spinner animation="border" variant="success" />
  <Spinner animation="border" variant="danger" />
  <Spinner animation="border" variant="warning" />
        </div>
    )
}

export default Load