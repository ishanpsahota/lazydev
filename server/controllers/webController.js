const bcrypt = require('bcryptjs')

// modals
const Web = require('../models/webhandlers');
const Log = require('../models/logs')

exports.status = function(req, res) {
    
    Web.findOne().exec(function(err, webStatus) {

        var matched = ""
        var error = ""

        if(err) return res.status(400).json({err, api: 'API OK'})
        if(!webStatus) return res.status(404).json({error: 'Not able to find DB', api: 'API OK'})
        if(webStatus) { 
            
            matched = bcrypt.compare(process.env.SYSUP, webStatus.websiteStatus)
            
            return res.status(200).json({
                dbstatus: matched ? "DB OK" : "DB NOT OK",
                error: error ? error : 'null',
                api: "API OK"
            })            
        }            
    });                                    
}

exports.turnSysDown = async function(req, res) {

    try {

        const username = req.body.username
        const password = req.body.password

        if(username && password)
        {
            var doc = await Web.findByCredentials(username, password);            

            var status = await bcrypt.compare(process.env.SYSUP, doc.websiteStatus)            

            if(status == true) 
            {
                let hash = await bcrypt.hash(process.env.SYSDOWN, 8)
                doc.websiteStatus = hash;
                doc.save()
                .then(() => {
                    return res.sendStatus(202);
                }).catch((error) => {
                    return res.sendStatus(403).json({error});
                })
            }      
            else return res.sendStatus(400);      
        }
    }
    catch(error) {         
        return res.sendStatus(403).json({error})
    }
    
}

exports.turnSysUp = async function(req, res) {

    try {

        const username = req.body.username
        const password = req.body.password

        if(username && password)
        {
            var doc = await Web.findByCredentials(username, password);            

            var status = await bcrypt.compare(process.env.SYSDOWN, doc.websiteStatus)            

            if(status == true) 
            {
                let hash = await bcrypt.hash(process.env.SYSUP, 8)
                doc.websiteStatus = hash;
                doc.save()
                .then(() => {
                    return res.sendStatus(202);
                }).catch((error) => {
                    return res.sendStatus(402).json({error});
                })
            }      
            else return res.sendStatus(400);      
        }
    }
    catch(error) {         
        return res.sendStatus(403).json({error})
    }
}