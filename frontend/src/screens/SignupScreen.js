import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import loginImg from '../images/login.svg';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';

const initialValues = {
  name : "",
  email : "",
  password : "",
  cpassword : "",
}

function SignupScreen() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({password:''});
  const [message, setMessage] = useState({color:'',message:''});
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(null);

  const postRegister = async ()=>{
    setMessage({color:'blue',message:' '})
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body:JSON.stringify({"name":values.name, "email":values.email, "password":values.password}),
      redirect: 'follow'
    }
    const data = await fetch("https://thawing-sierra-99222.herokuapp.com/api/users/register", requestOptions);
    setLoading(false);
    console.log(data.status);
    const temp = await data.text();
    if(data.status === 200){
      localStorage.setItem('access',JSON.stringify(temp));
      window.location.href = '/';
    }
    else if(data.status === 400){
      setMessage({ color:'red', message: temp});
    }
  }

  const validate = (fieldValues = values) => {
    console.log(position);

    let temp = { ...errors }
    if ('name' in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required."
    if ('email' in fieldValues)
      temp.email = (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).test(fieldValues.email) ? "" : "Email is not valid."
    if ('password' in fieldValues)
      temp.password = (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).test(fieldValues.password) ? "" : "Password must have atleast one special character, one number and have a minimum length of 6"
    if(position === null){
      temp.position = position ? "" : "This field is required."
      console.log(temp);
    }
      

    setErrors({
        ...temp
    })
  }

  useEffect(()=>{
    let temp = { ...errors }
    if(temp.password===""){
      temp.cpassword = (values.password===values.cpassword) ? "":"Passwords do not match";
    }
    else if(temp.password!=="" && values.password!==""){
      temp.cpassword = "Please fill the password field Correctly"
    }
    setErrors({
      ...temp
  })
  },[values.cpassword])

  const LocationMarker = ()=>{
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  const handleInputChange = (e)=>{
    const {name,value} = e.target;
    setValues({
      ...values,
      [name]: value
    })
    validate({ [name]: value })
  }

  const handleClick = () => {
    validate();
    if(errors.name === "" && errors.email === "" && errors.password === '' && errors.cpassword === '' && errors.positon){
      postRegister();
      console.log(values);
    }
  }

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', backgroundImage:'linear-gradient(to right, #4895ef, white)' }}>
      <Row style={{ display:'flex', justifyContent:'center', alignItems:'center', width:'100%' }}>
        <Col xs={10} md={8}>
          <Card className="p-4" style={{ zIndex:'2', position:'relative', borderRadius:'10px' }}>
            <Row >
              <Col className="d-none d-lg-block" lg={6} style={{display:'flex', justifyContent:'center', alignItems:'center', verticalAlign:'middle', marginTop:'auto', marginBottom:'auto'}}>
                <Image src={loginImg} fluid />
              </Col>
              <Col xs={12} lg={6}>
                <h4 className="text-center">Sign Up</h4>
                <form>
                  <Row>
                    <Col>
                      <div className="form-group" style={{marginBottom:'0px'}}>
                        <label htmlFor="name" style={{marginBottom:'0px'}}>Full Name :</label>
                        <input type="text" className="form-control" name="name" id="name" placeholder="Full Name" style={{ width:'100%' }} onChange={(e)=>{handleInputChange(e)}} />
                        <small className="form-text text-danger">{errors.name}&nbsp;</small>
                      </div>
                    </Col>
                    <Col>
                      <div className="form-group" style={{marginBottom:'0px'}}>
                        <label htmlFor="email" style={{marginBottom:'0px'}}>Email address :</label>
                        <input type="email" className="form-control" name="email" id="email" placeholder="email" style={{ width:'100%' }} onChange={(e)=>{handleInputChange(e)}} />
                        <small className="form-text text-danger">{errors.email}&nbsp;</small>
                      </div>
                    </Col>
                  </Row>
                  
                  

                  <Row>
                    <Col>
                      <div className="form-group" style={{marginBottom:'0px'}}>
                        <label htmlFor="password" style={{marginBottom:'0px'}}>Password :</label>
                        <input type="password" className="form-control" name="password" id="password" placeholder="Password" style={{ width:'100%' }} onChange={(e)=>{handleInputChange(e)}} />
                        <small className="form-text text-danger">{errors.password}&nbsp;</small>
                      </div>
                    </Col>
                    <Col>
                      <div className="form-group" style={{marginBottom:'0px'}}>
                        <label htmlFor="cpassword" style={{marginBottom:'0px'}}>Confirm Password :</label>
                        <input type="password" className="form-control" name="cpassword" id="cpassword" placeholder="Confirm Password" style={{ width:'100%' }} onChange={(e)=>{handleInputChange(e)}} />
                        <small className="form-text text-danger">{errors.cpassword}&nbsp;</small>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'col'}}>
                    Click on the map:<br/>
                    
                  </Row>
                  {/* <Row className="text-center" style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'col'}}>
                  <small>We would like to know ur location <br/>for a better user experience</small>
                  </Row> */}
                  <Row style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <MapContainer
                      center={{ lat: 51.505, lng: -0.09 }}
                      zoom={15}
                      zoomControl={false}
                      scrollWheelZoom={true}>
                        <TileLayer
                          attribution='&copy;'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker />
                      </MapContainer>
                    </Row>
                    <Row className="text-center text-danger" style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'col'}}>
                  <small>{errors.position}&nbsp;</small>
                  </Row>
                </form>
                <div style={{ display:'flex', justifyContent:'center', alignItems:'center', width:'100%' }}>
                  <small style={{color:`${message.color}`}}>&nbsp;
                    {message.message}{loading && <Loader />}
                  </small>
                </div>
                <div style={{ display:'flex', justifyContent:'center', alignItems:'center', width:'100%' }}>
                  <Button className="btn btn-primary my-2"  onClick={()=>handleClick()}>Submit</Button>
                </div>
                <Row className="text-center">
                  <Link to="/login" style={{width:'100%'}}>Login</Link>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default SignupScreen
