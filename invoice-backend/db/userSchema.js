import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({ 
    fname:{
        type:String,
        required:true
    },
    firmname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }, 
    password:{
        type:String,
        required:true
    },
    confpassword:{
        type:String,
        required:true
    },
    title:{
        type:String
    },
    address:{
        type:String
    },
    contact:{
        type:Number,
        required:true
    }
})
export default mongoose.model("users",userSchema)