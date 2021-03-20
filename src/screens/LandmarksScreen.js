import React, {useState, useEffect} from 'react'
import background from '../images/plantrip.jpeg';
import styled from 'styled-components';
import MainNav from '../components/MainNav';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import axios from 'axios';
import Landmarks from '../images/landmarks.jpg';

function LandmarksScreen() {
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [landmarks, setLandmarks] = useState(null);
  const [country, setCountry] = useState(null);

  const get_cities_and_attr = async () => {
    try {
      let ll = [];
      console.log(country);
      const response = await get_cities_attr(country);
      console.log(response['data']['suggestions'][2]['entities']);
      let extracted = response['data']['suggestions'][2]['entities'];
      for (let i of extracted) {
        let im = "None"
        let o = {
            name: i.name,
            lat: i.latitude,
            long: i.longitude,
            image_uri: im,
            destinationId: i.destinationId,
            caption: i.caption.replace(/(<([^>]+)>)/gi, ''),
          };
        ll.push(o)
      }
      setLandmarks(ll);
      setLoading(false);
      console.log(ll); //this is the list with all deets
      await this.props.add_tourist_attr_to_new(ll); // this is redux part
    } catch (e) {
      console.log(e);
    }
  };

  const get_cities_attr = async (city) => {
    var config = {
        method: 'get',
        url: 'https://hotels4.p.rapidapi.com/locations/search?query=' + city + '&locale=en_US',
        headers: {
          'x-rapidapi-key': 'e3078ac64amsh7ca33c2f0f6ba25p1cb3c2jsn3201da75e3b0',
    'x-rapidapi-host': 'hotels4.p.rapidapi.com'
        }
      };
  
    let response = await axios(config)
    return response
 }
  
  useEffect(()=>{
    if(localStorage.getItem('city')){
      setCity(JSON.parse(localStorage.getItem('city')));
      setCountry(JSON.parse(localStorage.getItem('country')));
      get_cities_and_attr();
      console.log(JSON.parse(localStorage.getItem('city')));
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
          {loading?<div className="mt-5"><Loader height='100px' width='100px' /></div> : 
          <div className="text-center" style={{marginTop:'30px', width:'100%'}}>
            <h1 style={{color:'white'}}>{city.name}</h1>
            <Row style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
              {landmarks.map((landmark, index)=>{
                return(
                  <Col xs={4}>
                    <Card className="my-3 pb-1 rounded text-center" style={{backgroundColor:'rgba(0,0,0,0.8)', color:'orange', cursor:'pointer'}} >
                      <img src={Landmarks} alt=""/>
                      <h5>{landmark.name}</h5>
                      {landmark.caption}
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </div>
          }
        </Row>
      </Container>
    </div>
  )
}

export default LandmarksScreen

const Image = styled.div `
  background: url(${background});
  background-size: cover;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: -1;
`
