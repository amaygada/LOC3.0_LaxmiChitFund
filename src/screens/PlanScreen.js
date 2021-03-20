import React, {useState, useEffect} from 'react'
import background from '../images/plantrip.jpeg';
import styled from 'styled-components';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import MainNav from '../components/MainNav';
import axios from 'axios';
import Loader from '../components/Loader';

const initialValues = {
  search: localStorage.getItem('country'),
}

function PlanScreen() {
  console.log(initialValues);

  const [values, setValues] = useState(initialValues);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const get_cities_and_attr = async () => {
    try{
      setLoading(true);
      let ll = [];
      console.log(values.search);
      const response = await get_cities_attr(values.search);
      console.log(response["data"]["suggestions"][0]["entities"])
      let extracted = response["data"]["suggestions"][0]["entities"]
      for(let i of extracted){
        if(i.type==="CITY"){
          let im = ""
          try{
            const response = await get_image_city(i.name.toLowerCase())
            im = response["data"]["photos"][0]["image"]["mobile"] //use "web" for web compatible images
          }catch(e){
            im = ""
            console.log(e);
          }
          let o = {
            "name" : i.name ,
            "lat" : i.latitude,
            "long" : i.longitude,
            "image_uri" : im,
            "destinationId" : i.destinationId,
            "caption" : i.caption.replace(/(<([^>]+)>)/gi, "")
          }
          ll.push(o);
        }
      }
      setLoading(false);
      setList(ll);
    }catch(e){
        console.log(e);
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('country')){
      get_cities_and_attr();
    }
  },[])
  
  useEffect(()=>{
    console.log(list);
  },[list])

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
  
  const get_image_city = async (city) => {
    let url = "https://api.teleport.org/api/urban_areas/slug:" + city + "/images/"
    let response = await axios.get(url)
    return response
  }

  const handleInputChange = (e)=>{
    const {name,value} = e.target;
    setValues({
      ...values,
      [name]: value
    })
    // validate({ [name]: value })
  }

  const handleClick = ()=>{
    if(values.search !== ''){
      get_cities_and_attr();
    }
  }

  return (
    <div>
      <Image /> 
      <MainNav />
      <Container>
        <Row style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
          <div style={{width:'100%', marginTop:'100px'}}>
            <span>
            {/* <Form.Label column="lg" lg={3}>Search  </Form.Label> */}
            <Col style={{textAlign:'center'}}>
                <Input size="xl" type="text" name="search" placeholder="Country Name" style={{width:'60%',display: 'inline'}} onChange={(e)=>{handleInputChange(e)}}/>
                <Button type="submit" 
                  style={{
                    background: 'transparent',
                    border:'1px solid black', 
                    borderRadius: '3px', 
                    minWidth:'10%',
                    display: 'inline',
                    transform:'translateY(-5%)'
                    }}
                  onClick={()=>{handleClick()}}
                >Search</Button>
            </Col>
            </span>
          </div>
        </Row>
        <Row style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          {loading? <div className="mt-2"><Loader height='100px' width='100px' /></div> : list.map((element, index)=>{
            return (
              <Col xs={4} keu={index}>
                <Card className="my-3 pb-1 rounded text-center" style={{backgroundColor:'rgba(0,0,0,0.8)', color:'orange', cursor:'pointer'}} onClick={()=>{
                  localStorage.setItem('city', JSON.stringify(element));
                  localStorage.setItem('country', JSON.stringify(values.search));
                  window.location.href=`/city/${element.name}`;
                }}>
                  <img src={element.image_uri===""?"https://d13k13wj6adfdf.cloudfront.net/urban_areas/perth-1e220f50f9.jpg":element.image_uri} alt=""/>
                  <h5>{element.name}</h5>
                  {values.search}
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default PlanScreen

const Image = styled.div `
  background: url(${background});
  background-size: cover;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: -1;
`
const Input = styled(Form.Control) `
  &:hover{
    background-color:black;
    color:orange;
  }
  &:focus{
    background-color:black;
    color:orange;
  }
  background-color:black;
  width:60%;
  display:inline;
  color:orange;
`
const ReportButton = styled(Button) `
  margin-top: 5vh;
  width: 10%;
  border-radius: 3px;
  background: transparent;
  color: #fff;
  border: 2px solid black;
  display:inline;
  transform:translateY(-5%);
  &:hover {
    background-color:black;
    border: 2px solid black;
  }
`;
