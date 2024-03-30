const express = require('express')
const app = express()
const port = 3000
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jobRouter = require('./routes/job')
const authRouter = require('./routes/auth')
const bodyParser = require('body-parser')

dotenv.config();

const admin = require('firebase-admin');
const jobSL = require('.//jobSL_firebase.json');

admin.initializeApp({
    credential:admin.credential.cert(jobSL), 
})

mongoose.connect(process.env.MONGO_URL)
 .then(()=>console.log('Connected to jobsl db'))
 .catch((err)=>console.log(err));

 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended:true}))

 app.use('/api/jobs',jobRouter)
 app.use('/api/',authRouter)


app.listen(process.env.PORT || port,()=> console.log('Example app listening on port',process.env.PORT))