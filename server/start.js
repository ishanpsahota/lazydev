require('dotenv').config()
const app = require('./app')

const server = app.listen(process.env.PORT, function(err) {
    if(err) throw err
    console.log(`Express running on Port ${process.env.PORT}`);
})