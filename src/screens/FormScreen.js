import React, {useState, useEffect} from 'react'
import MainNav from '../components/MainNav';
import Loader from '../components/Loader';
import styled from 'styled-components';
import background from '../images/plantrip.jpeg';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';

const initialValues = {
  country:'',
  number:'',
  startdate:'',
  enddate:'',
}

function FormScreen() {
  const [values, setValues] = useState(initialValues);
  const [message, setMessage] = useState('');

  const handleInputChange = (e)=>{
    const {name,value} = e.target;
    setValues({
      ...values,
      [name]: value
    })
    // validate({ [name]: value })
  }

  const handleSubmit = ()=>{
    if(values.number && values.startdate && values.enddate && values.country){
      console.log(values);
      localStorage.setItem('details', JSON.stringify(values));
      localStorage.setItem('country', values.country);
      window.location.href = '/plantrip'
    }
    else{
      setMessage("Please fill all the fields")
    }
  }

  return (
    <div>
      <Image /> 
      <MainNav />
      <Container>
        <Row style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Col style={{marginTop:'100px'}} xs={8}>
            <Card className="text-center p-4 rounded" style={{backgroundColor:'rgba(255,255,255,0.8)', color:'black'}}>
              <h4>Trip Details</h4>
              <Row>
                <Col>
                <div class="form-group mt-4">
                  <label for="exampleInputEmail1">Country :&nbsp;</label>
                  <input type="text" name="country" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Country" value={values.country} style={{display:'inline', width:'74%'}} onChange={(e)=>{handleInputChange(e)}}/>
                </div>
                </Col>
                <Col>
                <div class="form-group mt-4">
                  <label for="exampleInputEmail1">No. of people :&nbsp;</label>
                  <input type="number" name="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Number" value={values.number} style={{display:'inline', width:'60%'}} onChange={(e)=>{handleInputChange(e)}}/>
                </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div class="form-group mt-4">
                    <label for="exampleInputEmail1">Start date :&nbsp;</label>
                    <input type="date" name="startdate" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Number" value={values.startdate} style={{display:'inline', width:'70%'}} onChange={(e)=>{handleInputChange(e)}}/>
                  </div>
                </Col>
                <Col>
                  <div class="form-group mt-4">
                    <label for="exampleInputEmail1">End date :&nbsp;</label>
                    <input type="date" name="enddate" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Number" value={values.enddate} style={{display:'inline', width:'70%'}} onChange={(e)=>{handleInputChange(e)}}/>
                  </div>
                </Col>
              </Row>
              <Row className="mt-2" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Button className="btn btn-dark" onClick={()=>{handleSubmit()}}>Submit</Button>
              </Row>
              <Row className="text-center text-danger mt-2" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <small>{message}&nbsp;</small>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default FormScreen

const Image = styled.div `
  background: url(${background});
  background-size: cover;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: -1;
`
const Input = styled.input `
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
