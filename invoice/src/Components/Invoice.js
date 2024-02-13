import React,{useState,useRef} from 'react'
import Nav2 from './Nav2'
import {useNavigate} from 'react-router'
import jwt_decode from 'jwt-decode';
import { Grid } from '@mui/material';
import {addInvoice} from '../Config/Myservice'
export default function Invoice() {
    const navigate = useNavigate()
    const [flag, setflag] = useState(false)
    const [productdata, setproductdata] = useState([])
    const itemRef = useRef(null)
    const quantityRef = useRef(null)
    const priceRef = useRef(null)
    const discountRef = useRef(null)
    const rname = useRef(null)
    const raddress = useRef(null)
    const remail = useRef(null)
    const rdate = useRef(null)

    const submitproduct=()=>{
        const newproduct = {
            title:itemRef.current.value, 
            quantity:parseInt(quantityRef.current.value), 
            price: parseInt(priceRef.current.value), 
            discount: parseInt(discountRef.current.value),
            total: ((priceRef.current.value - (priceRef.current.value * discountRef.current.value / 100)) * quantityRef.current.value)
        }
        if(newproduct.total > 0){
            setproductdata([...productdata, newproduct])
            setflag(false)
        }
        else{
            alert('Total is less than 0')
            setflag(false)
        }
    }

    const submitdata=()=>{
        let token = localStorage.getItem('_token');
        let decode = jwt_decode(token);
        const newdata = {
            rname: rname.current.value,
            remail: remail.current.value,
            raddress: raddress.current.value,
            rdate: rdate.current.value,
            product: productdata,
            status:'UNPAID'
        }
        addInvoice(newdata).then(res=>{
            console.log(res.data)
        })
        navigate('/dashboard')
        
    }
    return (
        <div>
            <Nav2 /><br/>
            <Grid align='center'>
            <h2>Add Invoice</h2>
            </Grid>
            <br/>
            <div className="container mt-3">
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control" name="rname"placeholder="Reciever name" aria-label="Recieve name" ref={rname}/>
                </div>
                <div class="col">
                    <input type="email" class="form-control" name="remail"placeholder="Reciever Email" aria-label="Recieve email" ref={remail} />
                </div>
                <div class="col">
                    <input type="text" class="form-control" name="raddress"placeholder="receiver address" aria-label="receiver address" ref={raddress} />
                </div>
                <div class="col">
                    <input type="date" class="form-control" name="rdate"placeholder="receiver date" aria-label="receiver date" ref={rdate} />
                </div>
            </div>
            <br/>
            <table className='container table'>
               <thead>
                   <tr>
                    <th>SrNo.</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Total</th>
                   </tr>
               </thead>

               <tbody>
                {productdata.map((ele, index)=>
                   <tr>
                       <td>{index+1}</td>
                       <td>{ele.title}</td>
                       <td>{ele.quantity}</td>
                       <td>{ele.price}</td>
                       <td>{ele.discount}</td>
                       <td>{ele.total}</td>
                   </tr>
                   )}
               </tbody>
           </table>
           {flag ? <>
           <div className="container">
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control" name="item"placeholder="Item" aria-label="Item" ref={itemRef}/>
                </div>
                <div class="col">
                    <input type="text" class="form-control" name="quantity"placeholder="quantity" aria-label="Last name" ref={quantityRef}/>
                </div>
                <div class="col">
                    <input type="text" class="form-control" name="price"placeholder="price" aria-label="price" ref={priceRef}/>
                </div>
                <div class="col">
                    <input type="text" class="form-control" name="discount"placeholder="discount" aria-label="discount" ref={discountRef}/>
                </div>
               
            </div>
            <br/>
            <button onClick={()=> submitproduct()} className='btn btn-primary' >Submit Product</button>
            <br/>
           
            </div>
            </>  : <div className='text-center mt-3'>
            <button onClick={()=> setflag(true)} className='btn btn-primary' >Add Product</button>
            </div>}
            <Grid align='center'>
            <button onClick={()=> submitdata()} className='btn btn-primary' >Submit Product</button>
            </Grid>
            <br/>
            </div>
        </div>
    )
}
