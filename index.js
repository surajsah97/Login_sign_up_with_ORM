const express = require('express');
const app = express();
const morgan = require('morgan')
require('dotenv').config()

const users = require('./routes/route')
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json());
app.use(morgan('dev'))

app.use('/new', users);

const PORT = process.env.DB_PORT || 4003;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
});
