const Log = require('../models/logs')

exports.getTitleforSearch = (title) => {
    var temp_array = title.split("-");
    
    for(var i = 0; i < temp_array.length; i++ ) {
    
        let str = temp_array[i]
        let new_str = str[0].toUpperCase()

        for(var j = 1; j < str.length; j++) {
            new_str += str[j];
        }
        
        temp_array[i] = new_str;

    }

    let t = temp_array.join(" ");
    // console.log(t);
    return t;
}

exports.logActivity = async (log) => {
    let createLog = new Log(log);
    createLog.save()
    .then(() => {
        return true
    }).catch((error) => {
        return error;
    })
}

// getTitleforSearch("testing");