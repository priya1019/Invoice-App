import React,{useState} from 'react'
import Nav from './Nav'
import {Link} from 'react-router-dom'
import {Container,Button,Typography,TextField,Grid,Avatar,Paper} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {registerUser} from '../Config/Myservice';
import { useNavigate } from 'react-router';
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export default function Register() {
    const paperStyle={padding:20,height:'120vh',width:320,margin:"20px auto"}
    const avatarStyle={backgroundColor:"blue"}
    let [fname, setFname] = useState('');
    let [firmname,setFirmname]=useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confpassword, setConfpassword] = useState('');
    let [contact, setContact] = useState('');
    const navigate = useNavigate();
    const register= ()=>{
        let data = {fname:fname,firmname:firmname, email:email, password:password,
            confpassword:confpassword,contact:contact};
        registerUser(data)
        .then(res=>{
            if(res.data.err){
                alert(res.data.err)
            }
            else{
            localStorage.setItem("user",JSON.stringify(data));
            alert(res.data.msg)
            navigate('/login')
            }
        });
            
    }
    return (
        <>
        <Nav/>
        <Container>
                    <Grid>
                        <Paper elevation={10} style={paperStyle}>
                            <Grid align="center">
                            <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Register</h2>
                    </Grid>
                    <Grid>
                            {/* {/First Name /} */}
                            
                            <TextField id="name" label="First Name" name="fname" variant="outlined" className='label'
                            onChange={(e)=>{setFname(e.target.value)}} fullWidth></TextField><br/>
                              {fname!='' && fname.length < 4 && <span className="text-danger">Enter Name correctly</span>}
                            <br/>

                            {/* {/Firm Name /} */}
                            
                            <TextField id="firmname" label="Last Name" name="firmname" variant="outlined" className='label'
                             onChange={(e)=>{setFirmname(e.target.value)}} fullWidth></TextField><br/>
                             {firmname!='' && firmname.length < 4 && <span className="text-danger">Enter Last Name correctly</span>}
                             <br/>


                            {/* {/ Email /} */}
                           
                        <TextField id="email" label="Email" name="email" variant="outlined" className='label' 
                         onChange={(e)=>{setEmail(e.target.value)}} fullWidth></TextField><br/>
                        {email!='' && !regForEmail.test(email) && <span className="text-danger">Enter email  correctly</span>}
                        <br/>
                        {/* {/ Password /} */}
                       
                        <TextField id="password" name="password" label="Password" type="password"variant="outlined" className='label'
                        onChange={(e)=>{setPassword(e.target.value)}} fullWidth>
                        </TextField>
                        {password!='' && password.length < 8 && <span className="text-danger">Enter password  correctly</span>}
                        <br/><br/>
                        {/* {/ ConfPassword /} */}
                      
                        <TextField id="confpassword" name="confpassword" label="Confirm Password" type="password"
                        variant="outlined" className='label' onChange={(e)=>{setConfpassword(e.target.value)}} fullWidth>
                        </TextField>
                        {confpassword!='' && confpassword != password && <span className="text-danger">Passwords doesn't match</span>}
                        <br/><br/>
                        <TextField id="contact" name="contact" label="Contact Number " type="password"
                        variant="outlined" className='label' onChange={(e)=>{setContact(e.target.value)}} fullWidth>
                        </TextField>
                        {contact!='' && contact.length !== 10 && <span className="text-danger">Enter Mobile number correctly</span>}
                        
                        <br/><br/>

                        <Button variant="contained" type="submit"     fullWidth       className='btn'  sx={{
                                    color:'primary',
                                    borderRadius:'20px'
                                    }} onClick={register}>
                            <Typography variant="h6" component="div" >
                            Submit
                            </Typography>
                            </Button><br/><br/>
                                    <Grid align='center'>
                                    <Typography><b>Already Have an Account ?</b><br/>
                                    <Link to="/login" style={{textDecoration:'none'}}><b>LOGIN</b></Link> &nbsp; &nbsp;&nbsp; &nbsp;
                                    </Typography>
                                    </Grid>
                                    </Grid>
                                    </Paper>
                        </Grid>
                        </Container>
    </>
    )
}
