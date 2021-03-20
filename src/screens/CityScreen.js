import React, {useState, useEffect} from 'react'
import background from '../images/plantrip.jpeg';
import styled from 'styled-components';
import MainNav from '../components/MainNav';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import Loader from '../components/Loader';

function CityScreen() {
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);

  useEffect(()=>{
    if(localStorage.getItem('city')){
      setCity(JSON.parse(localStorage.getItem('city')));
      getWeather();
      console.log(JSON.parse(localStorage.getItem('city')));
    }
    else
      window.location.href = '/';
  },[])

  const getWeather = async()=>{
    try{
      var City = JSON.parse(localStorage.getItem('city'));
      City = City.name;
      var data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${City}&appid=e853535435b75dc53df232717c82891f&units=metric`);
      data = await data.json();
      setWeather(data);
      console.log(data);
      setLoading(false);
    } catch(error){
      console.log(error);
    }
  }

  return (
    <div>
      <Image /> 
      <MainNav />
      <Container>
        <Row style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
          <Col xs={9}>
            {loading?<div className="mt-5"><Loader height='100px' width='100px' /></div> :
            <Card className="pt-0 pb-4" style={{marginTop:'150px', backgroundColor:'rgba(0,0,0,0.8)', display: 'flex', justifyContent:'center', alignItems:'center', color:'orange', borderRadius:'20px'}}>
              <span style={{width:'100%'}}>
                <MapContainer center={[city.lat, city.long]} zoom={13} scrollWheelZoom={false}>
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[city.lat, city.long]}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </MapContainer>
              </span>
              <br/>
              <h2>{city.name}</h2>
              <div className="text-center" style={{color:'white', width:'100%'}}>
                <h5>Weather</h5>
                <Row style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <Col xs={3}>
                    Max Temp: {weather.main.temp_max} C
                  </Col>
                  <Col xs={3}>
                    Min Temp: {weather.main.temp_min} C
                  </Col>
                </Row>
                <Row style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <Col xs={3}>
                    Humidity: {weather.main.humidity}
                  </Col>
                  <Col xs={3}>
                    Pressure: {weather.main.pressure}
                  </Col>
                </Row>
                <Row style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <Col xs={3}>
                    Rain: {weather.weather[0].description}
                  </Col>
                  <Col xs={3}>
                    Wind speed: {weather.wind.speed}
                  </Col>
                </Row>
              </div>
            </Card>            
            }
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CityScreen

const Image = styled.div `
  background: url(${background});
  background-size: cover;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: -1;
`
