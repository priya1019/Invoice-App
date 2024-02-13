import React,{useState} from 'react'
import Nav from './Nav';
import {Container,Button,TextField,Typography,Grid,Paper,Avatar} from '@mui/material';
import { Link } from "react-router-dom";
import {loginUser} from '../Config/Myservice';
import { useNavigate } from 'react-router';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export default function Login() {
    const paperStyle={padding:20,height:'90vh',width:320,margin:"20px auto"}
    const avatarStyle={backgroundColor:"blue",height:50,width:50}
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const navigate = useNavigate();
    const login= ()=>{
        let data = {email:email, password:password};
        loginUser(data)
        .then(res=>{
            if(res.data.err){
                alert(res.data.err)
            }
            else{
            alert(res.data.msg)
            console.log(res.data)
            localStorage.setItem("_token",res.data.token);
            localStorage.setItem("user",JSON.stringify(data));
            sessionStorage.setItem("user", email);
            navigate('/dashboard')
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
                    <h2>Login</h2>
                    </Grid><br/>
                    <Grid>
                            {/* {/ Email /} */}
                        <TextField id="email" label="Email" name="email" variant="outlined" className='label' 
                         onChange={(e)=>{setEmail(e.target.value)}} fullWidth></TextField>
                        {email!='' && !regForEmail.test(email) && <span className="text-danger">Enter Email  correctly</span>}
                        <br/><br/>
                        {/* {/ Password /} */}
                        <TextField id="password" name="password" label="Password" type="password"variant="outlined" className='label' 
                        onChange={(e)=>{setPassword(e.target.value)}} fullWidth>
                        </TextField>
                        {password!='' && password.length < 8 && <span className="text-danger">Enter password  correctly</span>}
                        <br/><br/>
                        <p className='label'>Forgot Password ?</p>
                        <Button variant="contained" type="submit"   onClick={login}  fullWidth       className='btn'  sx={{
                                    color:'primary',
                                    borderRadius:'20px'
                                    }} >
                            <Typography variant="h6" component="div" >
                            Submit
                            </Typography>
                            </Button>
                            <br/><br/>
                            <Grid align="center" display="inline-flex">
                            <Avatar style={avatarStyle}><FacebookIcon/></Avatar>&nbsp;&nbsp;
                            <Avatar style={avatarStyle}><InstagramIcon/></Avatar>&nbsp;&nbsp;
                            <Avatar style={avatarStyle}><TwitterIcon/></Avatar> &nbsp;&nbsp;
                            </Grid>
                                    </Grid><br/><br/>
                                    <Grid align='center'>
                                    <Typography><b>Don't Have an Account ?</b><br/>
                                    <Link to="/"><b>Registration</b></Link> &nbsp; &nbsp;&nbsp; &nbsp;
                                    </Typography>
                                    </Grid>
                                    </Paper>
                                    </Grid>
                    </Container>            
        </>
    )
}
