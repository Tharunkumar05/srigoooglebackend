const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const user = require('./models/userModel');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoute');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/protectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const morgan = require('morgan');
const connectDB = require('./config/db.js');


dotenv.config()

connectDB();

var whitelist = ['https://srigoogleparadisesite.onrender.com']; // List of allowed origins

// CORS options
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true // This allows the server to accept cookies from the client
}

// Then pass these options to the cors middleware
app.use(cors(corsOptions));

// mongoose.connect('mongodb://127.0.0.1:27017/srigoogle')
//  .then(()=>console.log("Database Connected"))
//  .catch((err)=>console.log(err))


app.use(express.json());
// app.use(cors({
//     origin: '*'
// }));
// app.use(cors({
//     methods:["GET","POST","PUT", "DELETE"],
//     credentials: true
// }));
app.use(bodyParser.json());
app.use(cookieparser());
// app.use(morgan("dev"));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/contact',contactRoutes);

app.get("/", (req,res) =>{
    res.send({
        message: "Welcome to ecommerce app",
    });
});

const PORT = process.env.PORT ;
app.listen(PORT, ()=>{
    console.log("Server Runnning");
})