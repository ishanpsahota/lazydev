const bcrypt = require('bcryptjs')
const SALT_FACTOR = 8

exports.decodeSys = async function(keyphrase, syskey) {

    if(keyphrase && syskey) {
        return await bcrypt.compare(keyphrase, syskey);
    }
    else return false
}

exports.hardcodeSys = async function(phrase) {

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if(err) return false
        if(!salt) return false
        if(salt) {
            bcrypt.hash(phrase, salt, null, function(err2, hashed) {
                if(err2) return false
                if(!hashed) return false
                if(hashed) {                                                    
                    return hashed;                
                }
            }) 
        }
    })
    
}

exports.getTitle = (title) => {
    return title.split("-").join(" ");
}

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

exports.generateString = (length) => {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result.trim();
}