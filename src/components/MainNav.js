import React from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

function MainNav() {
  return (
    <>
        <Navs activeKey="/">
          <Nav className="mr-auto">
            <Navbar.Brand href="/" style={{color: '#D86A04', fontWeight: '600'}}>TravelBuddy</Navbar.Brand>
          </Nav>
            <Register href='/plantrip' eventKey="link-1">Plan Trip</Register>
            <Register href='/expenses' eventKey="link-2">Current Trip</Register>
            <Register href='/itinerary' eventKey="link-3">itinerary</Register>
            <Register href='/' eventKey="link-4"onClick={()=>{
              localStorage.removeItem('access');
              localStorage.removeItem('itenary');
            }}>Logout</Register>
        </Navs>
      </>
  )
}

export default MainNav

const Navs = styled(Navbar) `
  padding: 0.8rem 2rem;
  background: rgba(0,0,0,0.8);
  width: 98.8vw;
  z-index: 1;
  max-width: 100vw !important;
`

const Register = styled(Nav.Link) `
  background: transparent;
  color: #ddd;
  padding: 0.5rem 2rem !important;
  margin-right: 0.5rem;
  &:hover{
    color:orange;
  }
`
