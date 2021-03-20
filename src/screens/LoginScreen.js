import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Row, Image, Button } from 'react-bootstrap';
import loginImg from '../images/login.svg';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

const initialValues = {
  email:'',
  password:'',
}

function LoginScreen() {

  const [values, setValues] = useState(initialValues);
  const [message, setMessage] = useState({color:'',message:''});
  const [loading, setLoading] = useState(false);

  const postLogin = async ()=>{
    setMessage({color:'blue',message:' '})
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body:JSON.stringify(values),
      redirect: 'follow'
    }
    const data = await fetch("https://thawing-sierra-99222.herokuapp.com/api/users/login", requestOptions);
    setLoading(false);
    console.log(data.status);
    const temp = await data.text();
    if(data.status === 200){
      localStorage.setItem('access',JSON.stringify(temp));
      window.location.href = '/';
    }
    else if(data.status === 400){
      setMessage({ color:'red', message: 'incorrect details'});
    }
  }
  
  const handleClick = ()=>{
    if(values.email === '' || values.password === ''){
      setMessage({message:'Please fill all the fields', color:'red'});
    } else{
      postLogin();
    }
  }

  const handleInputChange = (e)=>{
    const {name,value} = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', backgroundImage:'linear-gradient(to right, #4895ef, white)' }}>
      <Row style={{ display:'flex', justifyContent:'center', alignItems:'center', width:'100%' }}>
        <Col xs={10} md={8}>
          <Card className="p-4" style={{ zIndex:'2', position:'relative', border:'none', borderRadius:'10px', minHeight:'500px'}}>
            <Row style={{height:'100%'}}>
              <Col className="d-none d-lg-block" md={6} style={{display:'flex', justifyContent:'center', alignItems:'center', verticalAlign:'middle', marginTop:'auto', marginBottom:'auto', height:'100%'}}>
                <Image src={loginImg} fluid />
              </Col>
              <Col xs={12} lg={6}>
                <h5 className="text-center">Login</h5>
                <form>
                  <div className="form-group">
                    <label htmlFor="email">Email address :</label>
                    <input type="email" className="form-control" name="email" id="email" placeholder="email" style={{ width:'100%' }} onChange={(e)=>{handleInputChange(e)}} />
                    <small className="form-text text-danger" style={{ zIndex: '-4' }}></small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password :</label>
                    <input type="password" className="form-control" name="password" id="password" placeholder="password" style={{ width:'100%' }} onChange={(e)=>{handleInputChange(e)}} />
                    <small className="form-text text-danger"></small>
                  </div>
                  <div style={{ display:'flex', justifyContent:'center', alignItems:'center', width:'100%' }}>
                    <Button className="btn btn-primary my-2" onClick={() => handleClick()}>Login</Button>
                  </div>
                </form>
                <Row className="text-center"><span style={{color:`${message.color}`, width:'100%', textAlign:'center'}}>{message.message}&nbsp;{loading && <Loader />}</span></Row>
                <Row className="text-center">
                  <Link to="/register" style={{width:'100%'}}>Sign Up</Link>
                </Row>
              </Col>
            </Row>
          </Card> 
        </Col>
      </Row> 
    </div>
  )
}

export default LoginScreen
