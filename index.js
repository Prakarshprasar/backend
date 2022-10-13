const express = require("express")
const app = express()

const connection =require("./db/db")
const cors = require("cors")
const userRouter = require("./Routes/userRoute")


app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(cors({
  origin:"*"
}))
app.get("/", (req,res)=>{
    res.send("hello")
})
app.get("/user",userRouter)

const PORT = process.env.PORT || 8080 
app.listen(PORT,()=>{
  connection;
    console.log("server started on  http://localhost:8080")
})