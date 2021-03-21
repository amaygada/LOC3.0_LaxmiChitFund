import React, {useState, useEffect} from 'react'
import MainNav from '../components/MainNav';
import Loader from '../components/Loader';
import styled from 'styled-components';
import background from '../images/plantrip.jpeg';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';

function ExpenseScreen() {
  const [total, setTotal] = useState(0);
  const [expense, setExpense] = useState();
  const [date, setDate] = useState();
  const [reason, setReason] = useState();
  const [table, setTable] = useState(JSON.parse(localStorage.getItem('expense')));

  return (
    <div>
      <Image /> 
      <MainNav />
      <Container>
        <Row style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Col style={{marginTop:'70px'}} xs={9}>
            <Card className="text-center p-4 mb-4" style={{backgroundColor:'rgba(255,255,255,0.8)', color:'black', borderRadius:'20px'}}>
              <h2>Expenses</h2>
              <Row className="mt-2">
                <Col>
                  <div class="form-group">
                    <label>Expense : &nbsp;</label>
                    <input type="number" class="form-control" placeholder="Expense" value={expense} onChange={(e)=>{setExpense(e.target.value)}} style={{display:'inline', width:'65%'}} />
                  </div>
                </Col>
                <Col>
                  <div class="form-group text-center">
                    <label>Select date :&nbsp;</label>
                    <input type="date" name="startdate" class="form-control" placeholder="Enter Number" value={date} style={{display:'inline', width:'64%'}} onChange={(e)=>{setDate(e.target.value)}}/>
                  </div>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <div class="form-group text-center">
                    <label>What for :&nbsp;</label>
                    <input type="text" name="startdate" class="form-control" placeholder="Enter Reason" value={reason} style={{display:'inline', width:'84%'}} onChange={(e)=>{setReason(e.target.value)}}/>
                  </div>
                </Col>
              </Row>
              <Row style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Button className="btn btn-dark" onClick={()=>{
                  if(expense && date && reason){
                    setTotal((t)=>(t+expense));
                    var temp = JSON.parse(localStorage.getItem('expense'))
                    temp = [...temp, {expense, date, reason}];
                    setTable(temp);
                    setExpense('');
                    localStorage.setItem('expense',JSON.stringify(temp));
                  }
                }}>Done</Button>
              </Row>
              <Row className="text-center mt-4">
                <Col><h5>Expense History</h5></Col>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Expense</th>
                      <th scope="col">Date</th>
                      <th scope="col">reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table && 
                    table.map((row)=>(
                      <tr>
                        <td>{row.expense} Rs</td>
                        <td>{row.date}</td>
                        <td>{row.reason}</td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ExpenseScreen

const Image = styled.div `
  background: url(${background});
  background-size: cover;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: -1;
`
