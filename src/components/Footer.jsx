import React from 'react'
import { Container } from 'reactstrap'

const Footer = () => {
  return (
    <div className='px-5 pb-3 pt-3 mt-5 bg-dark' style={{ boxShadow: '0 -1rem 3rem rgba(0,0,0,.175)' }}>
      <Container className='d-flex justify-content-center bg-dark'>
        <span className='text-white fs-6 fw-bolder'>&copy; TENFLIX 2023</span>
      </Container>
    </div>
  )
}

export default Footer