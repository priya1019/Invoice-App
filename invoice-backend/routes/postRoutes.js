import express from 'express'
import userSchema from '../db/userSchema.js'
import productSchema from '../db/productSchema.js'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken' 
const jwtSecret = "priya"
const router = express.Router();
const db = "mongodb://localhost:27017/invoice"
import nodemailer from 'nodemailer'
import multer from 'multer';
const storage=multer.memoryStorage();
var upload =multer({storage:storage});
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("MondoDB connected")
    }
    catch (err) {
        console.log(err.message)
    }
}
connectDB();
router.post("/register",(req, res)=>{
    let fname = req.body.fname;
    let firmname = req.body.firmname;
    let email = req.body.email;
    let password = req.body.password;
    let confpassword=req.body.confpassword;
    let title=req.body.title;
    let address=req.body.address;
    let contact = req.body.contact;
    let ins = new userSchema({fname:fname,firmname:firmname, email:email, password:password,
        confpassword:confpassword,contact:contact,title:"",address:""});
    ins.save((err)=>{
        if(err) {res.json({"err":"User already added"})};
        res.json({"msg":"Registered successfully"})
    })
})
router.post("/login",(req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    userSchema.findOne({email:email, password: password}, (err,data)=>{
        if(err){res.json({"err":err})}
        if(data===null){
            res.json({"err":"Email or password wrong"})
        }
        else{
            let payload={
                uid:email
            }
            const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
            res.json({"msg":"Logged in successfully","token":token})
        }
    })
})
router.post('/addinvoice',(req,res) => {
    let insert = new productSchema({
        rname:req.body.rname,
        remail:req.body.remail,
        raddress:req.body.raddress,
        rdate:req.body.rdate,
        email:req.body.email,
        product:req.body.product,
        status:req.body.status

    })
    insert.save((e)=>{
        console.log(e)
        if(e){
            res.send('Already added')
        }
        else{
            res.send('category added')
        }
    })
})
router.post('/fetchproduct',(req,res) => {
    let email = req.body.email;
    productSchema.find({email:email},(err,data)=>{
        if(err) throw err;
        else{
            res.send(data)
        }
    })
})
router.post('/email',upload.single('file') , (req,res)=>{
    var transporter = nodemailer.createTransport({
        service:"hotmail",
        auth:{
            user : 'priyapandey12345678@outlook.com',
            pass : 'Neosoft@',
        },
    });
    var mailOptions = {
      from: 'priyapandey12345678@outlook.com',
      to: 'priyapandey4721@gmail.com',
      subject: 'Invoice PDF',
      text:
       `
       Dear Customer,

       Your Have Successfully downloaded the pdf and We have attached the pdf here. Please find Attached PDF.
       
       Thank You!`,
       attachments: [{
        filename: 'invoice.pdf',
        content: req.file.buffer,
      }],
      
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.send("Email Sent!")
  })
router.post('/addsetting',(req,res)=>{
    catModel.updateOne({email:req.body.email},{$set:{title:req.body.title,address:req.body.address}},err=>{
        if(err) {res.json({"msg":"failed to update"})}
        else{
            res.json({"msg":'data updated'})
        }
    })
})
router.post("/deleteinvoice",(req,res)=>{
    productSchema.deleteOne({_id:req.body._id},(err,data)=>{
        if(err) throw err;
        else{
            res.send(data)
        }
    })
})
router.post("/updatepost",(req,res)=>{
    productSchema.updateOne({_id:req.body._id},{$set:{status:'PAID'}},(err,data)=>{
        if(err) throw err;
        else{
            res.send(data)
        }
    })
})
export default router
