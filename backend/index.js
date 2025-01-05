const express = require('express');
const app = express();
const mongoose= require('mongoose');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const cors = require('cors');


const port = 3000

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



