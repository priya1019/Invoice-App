import express from 'express'
import postRoutes from  './routes/postRoutes.js'
import cors from 'cors'
const port = 5000
const app = express();
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended:false}))

app.use("/api/posts",postRoutes)
app.listen(port,e=>{
    if(e) throw e;
    else{
        console.log(`listening on ${port}`)
    }
})