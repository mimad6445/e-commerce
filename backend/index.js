const http = require("node:http");
const express = require("express");
const router = require("./router/Router");
const userrouter = require("./router/Router.user")
const connectDB = require("./database/connection");
const bodyParser = require("body-parser")
const cors = require("cors");
const httpStatusText = require("./utils/httpStatusText")
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const path = require("node:path")

connectDB()
app.use(cors())
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/products', router);
app.use('/users',userrouter);
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.all('*',(req,res,next)=>{
    res.json({status : httpStatusText.ERROR , msg : "cannot found data"});
})

app.use('*',(error,req,res,next)=>{
    res.status(error.statusCode || 500).json({status : httpStatusText.ERROR , msg : error.message});
})
server.listen(process.env.PORT,()=>{
    console.log(`listing on port ${process.env.PORT}`);
})

