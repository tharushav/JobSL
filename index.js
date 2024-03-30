const express = require('express')
const app = express()
const port = 3000
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jobRouter = require('./routes/job')
const authRoute = require('./routes/auth')


dotenv.config();


mongoose.connect(process.env.MONGO_URL)
 .then(()=>console.log('Connected to jobsl db'))
 .catch((err)=>console.log(err));

 app.use(express.json());
 app.use('/api/',authRoute);


app.listen(process.env.PORT || port,()=> console.log('Example app listening on port',process.env.PORT))