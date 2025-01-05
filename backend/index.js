const express = require('express');
const app = express();
const mongoose= require('mongoose');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const cors = require('cors');
const {socketIo} = require('socket.io');
const http= require('http');
const port = 3000


const server = http.createServer(app);
const io= new socketIo(server);


let users = {};
io.on('connection', (socket)=>{
    console.log('User connected:', socket.id);

   //registering users
    socket.on('register', (userId) => {
        users[userId] = socket.id;
        console.log(`User ${userId} connected with socket ID ${socket.id}`);
    });

    //sending private message
    socket.on('privateMessage', ({ recipientId, message }) => {
        const recipientSocketId = users[recipientId];
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('privateMessage', message);
        }
    });

    // disconnecting user
    socket.on('disconnect', () => {
        for (let userId in users) {
            if (users[userId] === socket.id) {
                delete users[userId];
                break;
            }
        }
        console.log('User disconnected:', socket.id);
    });

});

//middleware
app.use(cors());
app.use(bodyParser.json());

//connection
mongoose.connect('mongodb://localhost:27017/login-signup')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



