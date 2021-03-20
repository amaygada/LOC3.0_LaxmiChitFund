import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Navbar';
import background from '../images/unnamed.jpg';
import New from '../images/new.jpg';
import Present from '../images/present.jpg';
import Past from '../images/past.jpg';

function HomeScreen() {

  return (
    <div>
      <Landing>
        <Header/>
        <Image />
        <Text>Welcome to the only company you will <br/>require while travelling</Text>
        <div style={{textAlign: 'center'}}>
        <Container className="mt-5">
          <Row style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Col xs={3}>
              <Card 
                className="rounded" 
                style={{position:'relative', backgroundColor:'black', color:'orange', cursor:'pointer'}}
                onClick={()=>{
                  window.location.href = localStorage.getItem('access')?"/plantrip":"/register"
                }}
              >
                <img className="rounded-top" alt="new" src={New} height="150px" width="100%"/>
                <h5 className="mt-1" style={{color:'white'}}>Plan A Trip</h5>
                <div className="mb-1">
                  help us plan your trip
                </div>
              </Card>
            </Col>
            <Col xs={3}>
              <Card className="rounded" style={{position:'relative', backgroundColor:'black', color:'orange', cursor:'pointer'}}
                onClick={()=>{
                  window.location.href = localStorage.getItem('access')?"/currenttrip":"/register"
                }}
              >
                <img className="rounded-top" alt="present" src={Present} height="150px" width="100%"/>
                <h5 className="mt-1" style={{color:'white'}}>Current Holiday</h5>
                <div className="mb-1">
                  Check your current trip
                </div>
              </Card>
            </Col>
            <Col xs={3}>
              <Card className="rounded" style={{position:'relative', backgroundColor:'black', color:'orange', cursor:'pointer'}}
                onClick={()=>{
                  window.location.href = localStorage.getItem('access')?"/pasttrip":"/register"
                }}
              >
                <img className="rounded-top" alt="past" src={Past} height="150px" width="100%"/>
                <h5 className="mt-1" style={{color:'white'}}>Past Holiday</h5>
                <div className="mb-1">
                  View your past holidays.
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
        </div>
        <Scroll>Scroll down to read guidelines</Scroll>
      </Landing>
      
      <Guidelines>
        <Headings>Some guidelines and safety measures</Headings>
        <ul>
          <li>To report a lost item than you found, click <Link to="/found">here</Link></li>
          <li>To find something you lost, click <Link to="/found">here</Link></li> 
          <li>Do not post or upload any sensitive information. We do not ask for any such information on our website</li>
          <li>Return an item you found only after verifying its rightful owner</li>
          <li>While returning or collecting an item, refrain from meeting at your house and opt for a public space instead.</li>
        </ul>
      </Guidelines>
    </div>
  )
}

export default HomeScreen;

const Landing = styled.div `
  max-width: 100vw;
  height: 100vh;
`;

const Image = styled.div `
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${background});
  background-size: cover;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: -1;
`

const Text = styled.p `
  font-size: 2rem;
  padding-top: 20vh;
  text-align: center;
  color: #fff;
`;

const FindButton = styled(Button) `
  margin: 5vh 2vw 0 0;
  width: 120px;
  border-radius: 3px;
  border: none;
  background: rgba(72,149,239,1);
  color: #000;
  border: 2px solid rgba(72,149,239,1);
`;

const ReportButton = styled(Button) `
  margin-top: 5vh;
  width: 120px;
  border-radius: 3px;
  background: transparent;
  color: #fff;
  border: 2px solid black;
  &:hover {
    background-color:black;
    border: 2px solid black;
  }
`;

const Headings = styled.h1 `
  font-size: 2rem;
  text-align: center;
  margin: 3rem;
`
const Scroll = styled.h6 `
  text-transform: uppercase;
  position: absolute;
  left: 41vw;
  top: 94vh;
  color: #bdbdbd;
`
const Guidelines = styled.div `
  margin: 2vh 15vw 20vh 15vw;
  border-radius: 10px;
  padding: 0.5rem 3rem 2rem 3rem;
  background: #ddd;
`