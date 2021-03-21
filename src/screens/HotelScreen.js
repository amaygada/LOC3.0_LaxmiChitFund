import React, {useState, useEffect} from 'react';
import MainNav from '../components/MainNav';
import Loader from '../components/Loader';
import styled from 'styled-components';
import background from '../images/plantrip.jpeg';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Rating from '../components/Rating';

function HotelScreen() {
  const [loading, setLoading] = useState(true);
  const [hotel, setHotel] = useState();
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [date, setDate] = useState();
  const [sdate, setSdate] = useState();
  const [edate, setEdate] = useState();
  const [form, setForm] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(()=>{
    if(localStorage.getItem('city')){
      setHotel(JSON.parse(localStorage.getItem('hotel')));
      console.log(JSON.parse(localStorage.getItem('hotel')));
      var temp = JSON.parse(localStorage.getItem('hotel'));
      temp = temp.coordinates;
      console.log(temp.lat)
      setLat(temp.lat);
      setLong(temp.long);
      setLoading(false);
    }
    else
      window.location.href = '/';
  },[])

  return (
    <div>
      <Image /> 
      <MainNav />
      <Container>
        <Row style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
          <Col xs={9}>
          {loading?<div className="mt-5"><Loader height='100px' width='100px' /></div> :
            <Card className="pt-0 pb-4 mb-5" style={{marginTop:'60px', backgroundColor:'rgba(0,0,0,0.8)', display: 'flex', justifyContent:'center', alignItems:'center', color:'orange', borderRadius:'20px'}}>
              <span style={{width:'100%'}}>
                <MapContainer center={[lat,long]} zoom={16} scrollWheelZoom={false}>
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[lat,long]}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </MapContainer>
              </span>
              <br/>
              <h2>{hotel.name}</h2>
              <h5>{hotel.address}</h5>
              <Rating value={hotel.star} text={`(${hotel.star})`} />
              <Button className="btn btn-dark mt-4" onClick={()=>{setForm(true)}}>Add to itinerary</Button>
                {form && 
                <>
                <div class="form-group mt-4 text-center">
                  <label for="exampleInputEmail1">Start date :&nbsp;&nbsp;&nbsp;</label>
                  <input type="date" name="startdate" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Number" value={sdate} style={{display:'inline', width:'70%'}} onChange={(e)=>{setSdate(e.target.value)}}/>
                </div>
                <div class="form-group mt-4 text-center">
                  <label for="exampleInputEmail1">End date :&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input type="date" name="startdate" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Number" value={edate} style={{display:'inline', width:'70%'}} onChange={(e)=>{setEdate(e.target.value)}}/>
                </div>
                <Row style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                  <Button className="btn btn-dark mt-4" onClick={()=>{
                    if(sdate && edate){
                      if(localStorage.getItem('itenary')){
                        console.log("bruv")
                        var country = localStorage.getItem('country');
                        var itinerary = JSON.parse(localStorage.getItem('itenary'));
                        itinerary = {...itinerary, sdate:sdate, edate:edate, hotel:hotel, country:country};
                        localStorage.setItem('itenary', JSON.stringify(itinerary));
                        if(itinerary.landmark)
                          window.location.href = '/itinerary';
                        else
                          window.location.href = '/landmarks';
                      } else{
                        var country = localStorage.getItem('country');
                        var itinerary = { sdate:sdate, edate:edate, hotel:hotel, country:country};
                        localStorage.setItem('itenary', JSON.stringify(itinerary));
                        if(itinerary.landmark)
                          window.location.href = '/itinerary';
                        else
                          window.location.href = '/landmarks';
                      }
                    } else{
                      setMessage('Please fill all fields')
                    }
                  }}>Done</Button>
                  <div>
                    <small className="text-danger">{message}&nbsp;</small>
                  </div>
                </Row>
                </>
                }
              </Card>}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default HotelScreen

const Image = styled.div `
  background: url(${background});
  background-size: cover;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: -1;
`
