const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const v1api = require('./routes/v1/routes')

const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', function() {
    console.log("MongoDB connected. ")
}).on('error', function(err) {
    console.log(`Mongoose encountered an error: ${err}`);
})

// var allowList = ['https://laazzzyyyydev.netlify.app/', '*']

app.use(cors({
    origin: "*",
    preflightContinue: true
}))
app.use(helmet())
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/api/v1', v1api)

module.exports = app;

