const express = require('express');
const app = express();
const port = 3000
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const jobRouter = require('./routes/job');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const chatRoute = require('./routes/chat');
const messageRoute = require('./routes/message');




dotenv.config();
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('connected to the db'))
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/', authRoute);
app.use('/api/users', userRoute);
app.use('/api/jobs', jobRouter);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);



const server = app.listen(process.env.PORT || 4000, () => console.log('Example app listening on port', process.env.PORT));

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://jobsl-production.up.railway.app/"
  }
});

io.on("connection", (socket) => {
  console.log("connected to sockets");

  socket.on('setup', (userId) => {
    socket.join(userId);
    socket.broadcast.emit('online-user', userId)
    console.log(userId);
  });

  socket.on('typing', (room) => {
    console.log("typing");
    console.log("room");
    socket.to(room).emit('typing', room)
  });

  socket.on('stop typing', (room) => {
    console.log("stop typing");
    console.log("room");
    socket.to(room).emit('stop typing', room)
  });

  socket.on('join chat', (room) => {
   socket.join(room)
   console.log('User Joined : '+room);
  });

  socket.on('new message',(newMessageReceived)=>{
    var chat = newMessageReceived.chat;
    var room = chat._id;

    var sender = newMessageReceived.sender;

    if(!sender || sender._id){
      console.log('sender not defined');
      return;
    }

    var senderId = sender._id;
    console.log(senderId + "message sender");
    const users = chat.users;

    if(!users){
      console.log("User not defined");
      return;
    }

    socket.to(room).emit('message recevied',newMessageReceived);
    socket.to(room).emit('message sent',"New message");
  });

  socket.off('setup',()=>{
    console.log('user offline');
    socket.leave(userId)
  })

})