import React, { useEffect, useState } from 'react'
import Nav2 from './Nav2'
import { useNavigate } from 'react-router'
import jwt_decode from 'jwt-decode'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Grid,Box, TextField,Button } from '@mui/material';
import { deleteInvoice, Updatepost, fetchproduct } from '../Config/Myservice'
export default function Dashboard() {
    const navigate = useNavigate()
    const [refresh, setrefresh] = useState(true)
    const [state, setstate] = useState({
        paymentReceived: 0,
        pendingAmount: 0,
        totalAmount: 0,
        paidInvoice: 0,
        unpaidInvoice: 0,
        totalInvoice: 0,
        invoices: []

    })
    const deleteEle = (item) => {
        deleteInvoice(item)
        setrefresh(!refresh)
    }
    const updateInvoice = (item) => {
        Updatepost(item)
        setrefresh(!refresh)
    }
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
      }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        // eslint-disable-next-line eqeqeq
        if (localStorage.getItem('_token') != undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            console.log(decode)
            // setUid(decode)
            let data = []
            await fetchproduct({ email: decode.email }).then(res => {
                data = [...res.data]
                console.log(res.data)
            })
            // setstate({...state,invoices:data})
            let sumOfTotal = 0;
            let upaid = 0;
            let pamount = 0;
            let totalinvoice = 0;

            data.forEach(ele => {
                console.log(ele)

                totalinvoice += 1
                if (ele.status === 'UNPAID') {
                    upaid += 1
                    console.log('inside status');
                    ele.product.map(item => {
                        sumOfTotal += item.total
                        pamount += item.total


                    })
                }
                else {
                    ele.product.map(item => {
                        sumOfTotal += item.total
                    })

                }

                console.log(sumOfTotal, "Sum of total")




                // setstate({...state,totalAmount:ele.product.total})
            })

            setstate({
                invoices: data,
                paymentReceived: sumOfTotal - pamount,
                pendingAmount: pamount,
                totalAmount: sumOfTotal,
                paidInvoice: totalinvoice - upaid,
                unpaidInvoice: upaid,
                totalInvoice: totalinvoice,
            })
        }
    }, [refresh])
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
    return (
        <div>
            <Nav2 />
            <br/><br/>
            <div className="container mt-3">
                <div className="row">
                    <br/><br/>
                <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
          Payment Received
          </Typography>
          <Typography variant="body2" color="text.secondary">
          <h4><b>{state.paymentReceived}</b></h4>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
          Pending Amount
          </Typography>
          <Typography variant="body2" color="text.secondary">
          <h4><b>{state.pendingAmount}</b></h4>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
          Total Amount
          </Typography>
          <Typography variant="body2" color="text.secondary">
          <h4><b>{state.totalAmount}</b></h4>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
                </div>
                <div className="row">
                    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
          Paid Invoice
          </Typography>
          <Typography variant="body2" color="text.secondary">
          <h4><b>{state.paidInvoice}</b></h4>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
                   
                        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
          Unpaid Invoice
          </Typography>
          <Typography variant="body2" color="text.secondary">
          <h4><b>{state.unpaidInvoice}</b></h4>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
                        
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
          Total Invoice
          </Typography>
          <Typography variant="body2" color="text.secondary">
          <h4><b>{state.totalInvoice}</b></h4>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
                </div>


            </div>
            <br/><br/>
            <div className="container mt-3">
<TableContainer component={Paper} >
<Table sx={{ minWidth: 700 }} aria-label="customized table">
  <TableHead >
    <TableRow>
    <StyledTableCell align="right">Sr No.</StyledTableCell>
    <StyledTableCell align="right">Reciever's Name</StyledTableCell>
    <StyledTableCell align="right">Reciever's Due Date</StyledTableCell>
    <StyledTableCell align="right">Reciever's email</StyledTableCell>
    <StyledTableCell align="right">Status</StyledTableCell>
    <StyledTableCell align="right">Action</StyledTableCell>

    </TableRow>
  </TableHead>
  <TableBody>
{state.invoices.map((ele, index) =>
<StyledTableRow>
<StyledTableCell align="right">{index + 1}</StyledTableCell>
<StyledTableCell align="right">{ele.rname}</StyledTableCell>
<StyledTableCell align="right">{ele.rdate}</StyledTableCell>
<StyledTableCell align="right">{ele.remail}</StyledTableCell>
<StyledTableCell align="right">{ele.status}</StyledTableCell>
<StyledTableCell align="right"><Button variant="success" type="submit"  onClick={() => navigate('/preview', { state: {user:ele,amount:state.totalAmount}} )}
                               sx={{
                                    color:'green',
                                    borderRadius:'20px'
                                    }} >
                            <Typography variant="h6" component="div" >
                            Preview
                            </Typography>
                            </Button> &nbsp;&nbsp;
<Button variant="primary" type="submit"   onClick={() => updateInvoice(ele)}
                               sx={{
                                    color:'blue',
                                    borderRadius:'20px'
                                    }} >
                            <Typography variant="h6" component="div" >
                            Update
                            </Typography>
                            </Button> &nbsp;&nbsp;
<Button variant="danger" type="submit"   onClick={() => deleteEle(ele)}
                               sx={{
                                   variant:'danger',
                                    color:'red',
                                    borderRadius:'20px'
                                    }} >
                            <Typography variant="h6" component="div" >
                            Delete
                            </Typography>
                            </Button> </StyledTableCell>
                            
    </StyledTableRow>
                        )}
                        </TableBody>
  </Table>
</TableContainer>
        </div>
        </div>
    )
}