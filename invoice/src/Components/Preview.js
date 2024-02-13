import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ReactToPdf from 'react-to-pdf';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import { email } from '../Config/Myservice';
import logo from './logo.jpg'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const options = {
    orientation: 'potrait',
    unit: 'in',
    format: 'A4'
};
export default function Preview() {
    const { state } = useLocation();
    console.log(state)
    const ref = React.createRef();

    const sendmail = () => {
        let abc =state.user.remail;
        console.log(abc);
        const input = document.getElementById("divToPrint");
        console.log(input);
        alert(
            'We have sent the  Email On your Email Address....',
            'success'
          )
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const img = canvas.toDataURL(
                "https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
            );
            pdf.addImage(img, "JPEG", 0, 0);
            const filedata = pdf.output("blob");
            // console.log(filedata);
            let formData = new FormData();
            formData.append("file", filedata, "samplefile");
            email(formData).then((res) => {
                console.log(res);
            });
        });
    };

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
        <div className="container" >
            <nav class="navbar">
                <div class="container-fluid">
                    <Link to="/"><button className='btn btn-primary'>Go Back</button></Link>
                    <ReactToPdf targetRef={ref} filename={`_invoice.pdf`} options={options} x={0} y={0} scale={0.6}>
                            {({ toPdf }) => (
                                <button onClick={() => {
                                    // sendData();
                                    toPdf();
                                }} variant="contained">
                                    Save
                                </button>
                            )}
                        </ReactToPdf>
                    <button onClick={()=>{sendmail()}} className='btn btn-primary'>Send Email</button>
                </div>
            </nav>
            <div ref={ref} id="divToPrint" className="container p-3" style={{border:"2px solid grey", backgroundColor:'white',height:"900px",width:"800px"}}>

                <nav class="navbar  navbar-light bg-light" >
                    <div class="container-fluid" style={{ height: "168px" }}>
                        <img src='logo.png' alt="" height="120px" width=" 185px" opacity=" 2" class="d-inline-block align-text-top" style={{ marginLeft: "15px", marginTop: "5px" }} />
                        <h2 style={{ marginRight: "173px", marginTop: "5px" }}><b>In<span style={{color:'red'}}>Voice</span></b></h2>
                    </div>
                </nav>
                <div className='row m-0 border'>
                    <div className='col text-left ml-4'>
                        <h6>From</h6>
                        <h5>Santa</h5>
                        <h5>santa@gmail.com</h5>
                        <h5>Universe</h5>
                        <h5>8888888888</h5>
                        <br />
                        <h6>Bill To</h6>
                            <h5>{state.user.remail}</h5>
                            <h5>{state.user.rname}</h5>
                            <h5>{state.user.raddress}</h5>
                        
                    </div>
                    <div className='col text-right mr-4'>
                    
                        <h6 style={{ textAlign: "right", marginRight: "15px" }}>Status</h6>
                        <h5 style={{ textAlign: "right", marginRight: "15px", color: "red", fontSize: "25px" }}><span style={{color:'green'}}>{state.user.status}</span></h5>
                        <br />
                        <h6 style={{ textAlign: "right", marginRight: "15px" }}>Date</h6>
                        <h5 style={{ textAlign: "right", marginRight: "15px" }}>{state.user.rdate}</h5>
                        <h5 style={{ textAlign: "right", marginRight: "15px" }}>Amount</h5>
                        <h3 style={{ textAlign: "right", marginRight: "15px" }}>&#8377; {state.amount}</h3>
                    
                        </div>

                </div>
                <br />

<TableContainer component={Paper} >
<Table sx={{ minWidth: 700 }} aria-label="customized table">
  <TableHead >
    <TableRow>
    <StyledTableCell align="right">Sr No.</StyledTableCell>
    <StyledTableCell align="right">Item</StyledTableCell>
    <StyledTableCell align="right">Qty</StyledTableCell>
    <StyledTableCell align="right">Price</StyledTableCell>
    <StyledTableCell align="right">Amount</StyledTableCell>

    </TableRow>
  </TableHead>
  <TableBody>
    {state.user.product.map((ele, index)=>{
        return(
<StyledTableRow key={index}>
<StyledTableCell align="right">{index + 1}</StyledTableCell>
<StyledTableCell align="right">{ele.title}</StyledTableCell>
<StyledTableCell align="right">{ele.quantity}</StyledTableCell>
<StyledTableCell align="right">{ele.price}</StyledTableCell>
<StyledTableCell align="right">{ele.total}</StyledTableCell>
    </StyledTableRow>
        )
})}
                        </TableBody>
  </Table>
</TableContainer>
               
            </div>


        </div>
    )
}
