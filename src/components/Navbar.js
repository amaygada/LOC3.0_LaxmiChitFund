import React from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

function Header() {
  if(localStorage.getItem('access')){
    return (
      <>
        <Navs activeKey="/">
          <Nav className="mr-auto">
            <Navbar.Brand href="/" style={{color: '#D86A04', fontWeight: '600'}}>TravelBuddy</Navbar.Brand>
          </Nav>
            <Register href='/' eventKey="link-1"onClick={()=>{
              localStorage.removeItem('access');
            }}>Logout</Register>
            {/* <Register href='/register' eventKey="link-1">Sign Up</Register> */}
        </Navs>
      </>
    )
  }
  else{
    return (
      <>
        <Navs activeKey="/">
          <Nav className="mr-auto">
            <Navbar.Brand href="/" style={{color: '#D86A04', fontWeight: '600'}}>TravelBuddy</Navbar.Brand>
          </Nav>
            <Register href='/login' eventKey="link-1">Login</Register>
            <Register href='/register' eventKey="link-1">Sign Up</Register>
        </Navs>
      </>
    )
  }
}

export default Header;

const Navs = styled(Navbar) `
  padding: 1.2rem 2rem;
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
`