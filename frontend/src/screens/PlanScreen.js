import React, {useState} from 'react'
import background from '../images/plantrip.jpeg';
import styled from 'styled-components';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import MainNav from '../components/MainNav';

const initialValues = {
  search:'',
}

function PlanScreen() {
  const [values, setValues] = useState(initialValues);

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
        console.log(values);
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
