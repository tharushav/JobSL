const express = require('express');
const app = express();
const port = 3000
const dotenv = require('dotenv');

const jobRouter = require('./routes/job');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const bodyParser = require('body-parser');


dotenv.config();
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('connected to the db'))
  .catch((err) => {
    console.log(err);
  });

 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended:true}))

 app.use('/api/jobs',jobRouter)

 app.use(express.json());
 app.use('/api/',authRoute);
 app.use('/api/users',userRoute);


app.listen(process.env.PORT || port,()=> console.log('Example app listening on port',process.env.PORT))