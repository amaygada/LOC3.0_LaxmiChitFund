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
            <Register href='/currenttrip' eventKey="link-2">Current Trip</Register>
            <Register href='/pastttrip' eventKey="link-3">Current Trip</Register>
            <Register href='/' eventKey="link-4"onClick={()=>{
              localStorage.removeItem('access');
            }}>Logout</Register>
        </Navs>
      </>
  )
}

export default MainNav

const Navs = styled(Navbar) `
  padding: 0.8rem 2rem;
  background: rgba(0,0,0,0.7);
  width: 100vw;
  z-index: 2;
  max-width: 100vw !important;
  position: fixed;
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
