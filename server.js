require("dotenv").config()
const express=require("express")
const app=express()
const bodyParser = require("body-parser");
const router = require("./routes/schoolRouter");
//middle ware

app.use(express.json())
app.use("/api",router)


app.use(bodyParser.json());
const PORT=process.env.PORT || 5000;


app.get("/", (req,res)=>{
    res.send("School API is running successfully 🚀")
})

require("./config/db")
app.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`)
})
