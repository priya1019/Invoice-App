import mongoose from 'mongoose'
const productSchema = new mongoose.Schema({ 
    rname:{
        type:String,
        required:true
    },
    remail:{
        type:String,
        required:true
    },
    raddress:{
        type:String,
        required:true
    }, 
    rdate:{
        type:String,
        required:true
    },
    product:{
        type:Array,
        require:true,
    },
    status:{
        type:String,
        require:true,
    }
})
export default mongoose.model("product",productSchema)