const express =require('express');
const app= new express();
const router =require('./src/route/api');
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const hpp =require('hpp');
const cors =require('cors');
const cookieParser = require('cookie-parser');
const path = require("path");
const mongoose=require('mongoose');


app.use(cookieParser());
app.use(cors())
app.use(helmet())
app.use(hpp())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)


// Database Connection
let URI="mongodb+srv://mohammad:sumu9897@cluster0.tb1lx0x.mongodb.net/CRUD";

let OPTION={user:'mohammad',pass:'sumu9897',autoIndex:true};

mongoose.connect(URI,OPTION).then((res)=>{
    console.log("DB Success")
}).catch((err)=>{
    console.log(err)
})


app.set('etag', false);

app.use("/api",router)
app.use(express.static('client/dist'));



// Add React Front End Routing
app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})


module.exports=app;