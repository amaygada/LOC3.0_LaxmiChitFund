import React, {useState, useEffect} from 'react'
import MainNav from '../components/MainNav';
import Loader from '../components/Loader';
import styled from 'styled-components';
import background from '../images/plantrip.jpeg';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function ItenaryScreen() {
  const [itenary, setItenary] = useState();

  useEffect(()=>{
    if(localStorage.getItem('itenary')){
      console.log(JSON.parse(localStorage.getItem('itenary')));
      setItenary(JSON.parse(localStorage.getItem('itenary')));
    }
  },[])

  return (
    <div>
      <Image /> 
      <MainNav />
      <Container>
        <Row style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Col style={{marginTop:'70px'}} xs={9}>
            {itenary && 
            <Card className="text-center p-4 mb-4" style={{backgroundColor:'rgba(255,255,255,0.9)', color:'black', borderRadius:'20px'}}>
              <Card.Title>
                <h2>Itinerary</h2>
                <Row className="mt-3">
                  <Col>
                    <h4>Country : {JSON.parse(itenary.country)}</h4>
                  </Col>
                  <Col>
                    <h4>City : {JSON.parse(localStorage.getItem('city')).name}</h4>
                  </Col>
                </Row>
                <Row className="mt-3" style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                  <h5>Hotel</h5>
                  <img src={itenary.hotel.im} alt="" height='350px' width='500px' style={{borderRadius:'20px'}}/>
                  <Rating value={itenary.hotel.star} text={`(${itenary.hotel.star})`} />
                  <h6>from {itenary.sdate} to {itenary.edate}</h6>
                  {itenary.hotel.address}
                </Row>
                <Row className="mt-5" style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                  <h5>Landmark : {itenary.landmark.name}</h5>
                  <h6>Visiting On : {itenary.date}</h6>
                  <span style={{width:'100%'}}>
                <MapContainer center={[itenary.landmark.lat, itenary.landmark.long]} zoom={13} scrollWheelZoom={false}>
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[itenary.landmark.lat, itenary.landmark.long]}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </MapContainer>
              </span>
                  <h6>{itenary.landmark.caption}</h6>
                </Row>
              </Card.Title>
            </Card>}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ItenaryScreen

const Image = styled.div `
  background: url(${background});
  background-size: cover;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: -1;
`
