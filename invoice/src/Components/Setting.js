import React from 'react'
import {Button,Card,Form} from 'react-bootstrap'
import  {useEffect, useState ,useRef} from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import { getSetting, addsetting, getPosts } from '../Config/Myservice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Nav2 from './Nav2'
const user = JSON.parse(localStorage.getItem('user'))
function Settings() {
    const titleRef = useRef(null)
    const addressRef = useRef(null)
    const [user,setUser] = useState([])
    const [data, setdata] = useState([])
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    setUser(user)
},[])
console.log(getSetting)
useEffect(() => {
  getPosts().then(res => {
        console.log(res.data)
        setdata(res.data)
    })
},[])
const add=()=>{
    if( titleRef.current.value!=="" & addressRef.current.value!==""){
    addsetting({"email":user.email,"title":titleRef.current.value,"address":addressRef.current.value}).then(res=>{
        alert(res.data.msg)
    })
}
}
    return (
        <>
        <Nav2/><br/>
        <Grid align='center'>
        <Card className="text-center" style={{ height:'550px',textAlign:'center',paddingTop:'10px',width:'1200px'}}>
        <Card.Header style={{fontSize:'50px'}}><b>  Profile</b></Card.Header>
        <Card.Body>
            <Card.Title>Welcome <b>{JSON.parse(localStorage.getItem('user')).fname} {JSON.parse(localStorage.getItem('user')).firmname}</b></Card.Title>
            <TableContainer component={Paper} style={{marginTop:'30px'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>sr.No</TableCell>
            <TableCell align="right">Company Name</TableCell>
            <TableCell align="right">Contact Email</TableCell>
            <TableCell align="right">Address of the Company</TableCell>

          </TableRow>
        </TableHead>
      <TableBody>
      {data.map((ele, index) =>
            <TableRow>
             
              <TableCell align="right">{index+1}</TableCell>
              <TableCell align="right">{ele.title}</TableCell>
              <TableCell align="right">{ele.email}</TableCell>
              <TableCell align="right">{ele.address}</TableCell>
            
          
            </TableRow>
          )}
      </TableBody>
      </Table>
    </TableContainer>

            <Box component="form" required  sx={{ mt: 3 }} enctype='multipart/form-data'>
            <Grid container spacing={2}>
            
            <Grid item xs={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
   
    <Form.Control type="email"  value={user.email} readOnly/>
   
  </Form.Group>
              
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="title" label="Company Name" name="title"autoComplete="title" inputRef={titleRef}/>
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="address" label="Enter Address" type="text" id="address" autoComplete="address" inputRef={addressRef}/>
                 </Grid>
            </Grid>
           <br/>
            <Button
              type="submit"
              fullWidth
              style={{background:'blue', color:'white'}}
              sx={{ mt: 3, mb: 2 }}
              onClick={add}
            >
              Update
            </Button>
    
         
           <br/>
            <Grid container justifyContent="flex-end">
              <Grid item>
             
              </Grid>
            </Grid>
          </Box>
         
        </Card.Body>
     
        </Card>
        </Grid>
        </>
    )
}

export default Settings
