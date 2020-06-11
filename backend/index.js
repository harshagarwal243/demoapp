const express = require('express');
const app = express();
const Auth = require('./routes/auth.js');
const User = require('./routes/user')

//MIDDLEWARES
app.use(express.json());

//Routes
app.use("/api",Auth);
app.use("/api",User);

//Starting Server

const port = process.env.PORT || 8000 ;
app.listen(port,() => { console.log(`App is running at port ${port}`)});
