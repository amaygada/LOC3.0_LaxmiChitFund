import React, {useState, useEffect} from 'react'
import background from '../images/plantrip.jpeg';
import styled from 'styled-components';
import MainNav from '../components/MainNav';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import axios from 'axios';
import Rating from '../components/Rating';

function HotelsScreen() {
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState(null);
  const [country, setCountry] = useState(null);

  const get_hotels = async (did , sdate , edate , num) => {
    const options = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/properties/list',
        params: {
          destinationId: did,
          pageNumber: '1',
          checkIn: sdate,
          checkOut: edate,
          pageSize: '25',
          adults1: num,
          currency: 'USD',
          locale: 'en_US',
          sortOrder: 'PRICE'
        },
        headers: {
          'x-rapidapi-key': 'e3078ac64amsh7ca33c2f0f6ba25p1cb3c2jsn3201da75e3b0',
    'x-rapidapi-host': 'hotels4.p.rapidapi.com'
        }
      };
     
      let response = await axios.request(options)
      return response
 }
  
 const get_hotel_photo = async (_id) => {
    const options = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/properties/get-hotel-photos',
        params: {id: _id},
        headers: {
          'x-rapidapi-key': 'e3078ac64amsh7ca33c2f0f6ba25p1cb3c2jsn3201da75e3b0',
    'x-rapidapi-host': 'hotels4.p.rapidapi.com'
        }
      };
     
      let response = await axios.request(options)
      return response
 }

 const get_cities_and_attr = async () => {
  try {
    var did = JSON.parse(localStorage.getItem('city'));
    console.log(did);
    did = did.destinationId;
    console.log(did);
    var details= JSON.parse(localStorage.getItem('details'));
    var sdate = details.startdate;
    var edate = details.enddate;
    var num = details.number;
    let ll = [];
    const response = await get_hotels(did , sdate , edate , num);
    console.log(sdate , edate);
    let extracted = response.data.data.body["searchResults"].results;
    let count = 0
    for (let i of extracted) {
        let o = {
          "address" : i.address.countryCode + " " + i.address.streetAddress + " " + i.address.locality + " " + i.address.postalCode +" " + i.address.countryName,
          "coordinates" : {"lat" : i.coordinate.lat , "long" : i.coordinate.lon},
          "name" : i.name,
          "price" : i.price,
          "star" : i.starRating,
          "id" : i.id,
          "im" : "None"
        }

        count +=1
        let r = ""
        if(count<5) {
          r = await get_hotel_photo(i.id)
          o["im"] = r.data.hotelImages[0]["baseUrl"].replace(/(_{size})/gi, '')
        }else{
          break;
        }
        ll.push(o);
    }
    console.log(ll); //this is the list with all deets
    setHotels(ll); // this is redux part
    setLoading(false);
  } catch (e) {
    console.log(e);
  }
};

 

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
              {hotels.map((hotel, index)=>{
                return(
                  <Col xs={4}>
                    <Card className="my-3 mb-2 pb-1 rounded text-center" style={{backgroundColor:'rgba(0,0,0,0.8)', color:'orange', cursor:'pointer'}}
                    onClick={()=>{
                      localStorage.setItem('hotel',JSON.stringify(hotel));
                      window.location.href = `/hotel/${hotel.name}`
                    }} 
                    >
                      <img src={hotel.im} width='100%' height='190px' alt=""/>
                      <h5>{hotel.name}</h5>
                      <Rating value={hotel.star} text={`(${hotel.star})`} />
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

export default HotelsScreen

const Image = styled.div `
  background: url(${background});
  background-size: cover;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: -1;
`
