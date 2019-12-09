const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

const router = require('./router')

const app = express();

mongoose.connect('mongodb://ds249718.mlab.com:49718/oktob');

app.use(cors())
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app)

const port = process.env.PORT || 3090

app.listen(port, () => console.log('Listening... on port   ' + port))
