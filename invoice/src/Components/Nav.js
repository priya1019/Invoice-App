import { AppBar, IconButton, Toolbar,Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.jpg'
export class Nav extends Component {

    render() {
        return (
            <>
               <Box sx={{flexGrow:1}}>
                   <AppBar position="static">
                       <Toolbar className='tools'>
                           <Link to="/" style={{textDecoration:'none',color:'black'}}><IconButton size="large" ><img src={logo} style={{height:50,width:50}}/>
                            <span className='dash'>&nbsp;&nbsp;&nbsp;Invoice </span>
                           </IconButton></Link>&nbsp; &nbsp;&nbsp; &nbsp;
                           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                             <Link to='/login' style={{textDecoration:'none',color:'black'}} >Login</Link> &nbsp; &nbsp;&nbsp; &nbsp;
                             <Link to='/register' style={{textDecoration:'none',color:'black'}}>Registration</Link> &nbsp; &nbsp;&nbsp; &nbsp;
                             &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                            </Typography>
                       </Toolbar>
                   </AppBar>
                </Box> 
            </>
        )
    }
}

export default Nav