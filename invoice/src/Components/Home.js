import React from 'react'
import Nav from './Nav'
import { Link } from 'react-router-dom'
import {Container,Button,Grid,Paper, Typography} from '@mui/material';
function Home() {
    const paperStyle={padding:20,height:'48vh',width:820,margin:"20px auto"}
    return (
        <div>
            <Nav/>
            <Container><br/><br/><br/>
                    <Grid>
                        <Paper elevation={10} style={paperStyle}>
                        <Typography>
                        <h1>Invoice Software That is Easy and Free</h1><br/>
                        <h2>Focus on Your Product</h2><br/>
                        <h3>Let us Handle Your Bill</h3><br/>
                        </Typography>
                        <Link to="/register" style={{textDecoration:'none',color:'white'}}>
                        <Button variant="contained" type="submit" fullWidth className='btn'  sx={{
                                    color:'primary',
                                    borderRadius:'20px'
                                    }} >
                            <Typography variant="h6" component="div" >
                            Register yourself from Here
                            </Typography>
                            </Button>
                            </Link>
                    </Paper>
                    </Grid>
                    </Container>
        </div>
    )
}

export default Home
