const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const webSchema = new mongoose.Schema({

    websiteStatus: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }    
})



webSchema.statics.findByCredentials = async (username, password) => {
        
    const webUser = await webhandlers.findOne({ username });
    
    if (!webUser) {
        throw new Error({ error: "Invalid login details" });
    }
  
    const isPasswordMatch = await bcrypt.compare(password, webUser.password);
    
    if (!isPasswordMatch) {
        throw new Error({ error: "Invalid login details" });
    }
    
    return webUser;

    // Admin.findOne({username}).exec(function(err, adminFound) {

    //     if(err) 
    //     {
    //         console.log(err)
    //         return new Error('Unknown Error')
    //     }

    //     if(!adminFound)
    //     {
    //         console.log('admin not found')
    //         return new Error('404')
    //     }

    //     if(adminFound)
    //     {
    //         const passwordMatch = bcrypt.compare(password, adminFound.password)

    //         if(!passwordMatch)
    //         {
    //             console.log('pass incorrect')
    //             return new Error('incorrect pass')
    //         }
    //         else return adminFound
    //     }

    // })
};

webSchema.pre("save", async function(next) {
    
    const webUser = this;
    
    if (webUser.isModified("password")) {
        webUser.password = await bcrypt.hash(webUser.password, 8);
    }
    
    next();
  });


const webhandlers = mongoose.model('webhandlers', webSchema);

module.exports = webhandlers;