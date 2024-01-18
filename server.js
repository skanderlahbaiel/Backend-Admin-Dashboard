const express = require('express')
const mongoose = require('mongoose')
const learnerRoutes = require('./Routes/learnerRoutes')
const cohortRoutes = require('./Routes/cohortRoutes')
const authRoutes = require('./Routes/authRoutes')
const Learner = require('./models/learner')
const User = require('./models/user');
const Cohort = require('./models/cohort');
const app = express()
const cors = require("cors");

// Enable CORS middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Add or modify this line
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
app.get('/', (req, res) => {
  res.send('Hello, world!');
});


mongoose.set("strictQuery", false)
mongoose.
connect('mongodb://127.0.0.1:27017/mydatabase')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(4000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/learner', learnerRoutes)
app.use('/cohort', cohortRoutes)
app.use('/auth', authRoutes)





