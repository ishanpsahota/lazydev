const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const salt_f = 8

const db = `mongodb+srv://ishanprasadsahota:VaticanCameos@5h3r@cluster0.7otv3.mongodb.net/lazydev`

const pass = "SWX4sFzZakwQaKcUdZPmtuY4"

const sysup = "4JzC3gquEqzhSchTwzvzgs5Z"

var ws = ""
ws = generatePass(salt_f, sysup);

require('../models/webhandlers')

const webUser = mongoose.model('webhandlers')

var connected = null;

async function connectDB() {

    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    mongoose.connection.on('open', function()
    {
        console.log('Connection established');
        connected = true

        if(connected) {
            handleWeb(ws);
        }

    }).on('error', function(err)
    {
        console.log('Connection error: ' + err);
        connected = false
        return 1;

    });

}

async function generatePass(salt_factor, password) {
    bcrypt.genSalt(salt_factor, function(err, salt) {
        if(err) throw err
        if(!salt) throw new Error("Not able to generate salt.")
        if(salt) {
            bcrypt.hash(password, salt, null, function(err2, hashed) {
                if(err2) throw err2
                if(!hashed) throw new Error("Not able to generate hashed password")
                if(hashed) {
                    console.log(hashed)
                    ws = hashed
                    console.log("ws: ", ws);
                    return hashed;                
                }
            }) 
        }
    })
}


function handleWeb(webStatus)
{
   
    var webUserDoc = {
        websiteStatus : webStatus,
        username: 'ishanpsahota',
        password: pass        
    }

    webUser.create(webUserDoc, function(err, created) {
        if(err) throw new Error(err)
        if(!created) throw new Error("Not able to create the doc")
        if(created){
                console.log("Created")
                return 0;
        };
    })    

    return 0;
}


connectDB()