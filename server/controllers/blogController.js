const bcrypt = require('bcryptjs')
const utils = require('../utils');

// modals
const Blog = require('../models/blog')
const Log = require('../models/logs');

exports.getAllBlogs = async function (req, res) {  
    Blog.find({'showStatus' : true}).
    then((blogs) => {        
        return res.json({blogs})
    }).catch((error) => {
        console.log(error)
        return res.sendStatus(404);
    })
}

exports.getSingleBlog = async function(req, res) {
    // if(req.params.title)
    // {
    //     Blog.findOne({'title': utils.getTitleforSearch(req.params.title) })
    //     .then((blog) => {
            
    //         try {
    //             blog.hits = blog.hits + 1;
    //             blog.save();
                
    //             let log = {
    //                 route: 'hitBlog',
    //                 remarks: `Increased the hit count for ${req.params.title}.`,
    //                 date: new Date(Date.now())
    //             }
        
    //             let logSave = utils.logActivity(log);
    //             if(logSave != true) console.log(logSave)                        
    //         }
    //         catch(err) {
    //             let log = {
    //                 route: 'hitBlog',
    //                 remarks: JSON.stringify(err)            
    //             }
        
    //             let logSave = utils.logActivity(log);
    //             if(logSave != true) console.log(logSave)                
    //         }

    //         return blog == null ? res.sendStatus(404) : res.json({blog})
    //     }).catch((error) => {
    //         console.log(error)
    //         return res.sendStatus(404)
    //     })
    // }
    try {
        var blog = await Blog.findOne({'title': utils.getTitleforSearch(req.params.title), 'showStatus': true})        
        
        let log = {
            route: 'hitBlog',
            remarks: `Visited ${req.params.title}.`,
            date: new Date(Date.now())
        }

        await utils.logActivity(log)       
        
        if(blog)
        {
            blog.hits = Number(blog.hits + 1)
            await blog.save();
        }

        return res.json({blog})
    } 
    catch (error) {
        let log = {
            route: 'hitBlog',
            remarks: JSON.stringify(error),
            date: new Date(Date.now())
        }

        await utils.logActivity(log);

        return res.status(404).json({error})
    }
}

exports.hitBlog = async function(req, res) {

    try {
        var doc = await Blog.findOne({'title' : utils.getTitleforSearch(req.params.title) })        
        
        let log = {
            route: 'hitBlog',
            remarks: `Increased the hit count for ${req.params.title}.`,
            date: new Date(Date.now())
        }

        await utils.logActivity(log);        

        if(doc)
        {            
            doc.hits = Number(doc.hits + 1)
            let docSave = await doc.save();
            if(docSave) return res.sendStatus(200)
        }
        
        return

    }
    catch(error) {
        let log = {
            route: 'hitBlog',
            remarks: JSON.stringify(error)            
        }

        let logSave = await utils.logActivity(log);
        if(logSave != true) console.log(logSave)

        return res.sendStatus(500)
    }

}

exports.saveUnsaveBlog = async function(req, res) {
    try
    {
        var doc = await Blog.findOne({'title': utils.getTitleforSearch(req.params.title)})

        if(doc)
        {
            doc.liked = !doc.liked
            let save = await doc.save();

            if(save) return res.send(doc.liked)
        }

        return
    }
    catch(error) 
    {
        return res.json({error})
    }
}

exports.saveBlock = async function(req, res) {
    try
    {
        var doc = await Blog.findOne({'title': utils.getTitleforSearch(req.params.title)})
        if(doc)
        {
            doc.blocks[req.params.id].saved = !doc.blocks[req.params.id].saved
            let save = await doc.save()

            return res.send(doc.blocks[req.params.id].saved)
        }
    }
    catch(error)
    {
        return res.json({error})
    }
}

exports.showHideBlog = async function(req, res) {
    try 
    {
        var doc = await Blog.findOne({'title': utils.getTitleforSearch(req.params.title)})

        if(doc)
        {
            doc.showStatus = !doc.showStatus
            let save = await doc.save()

            return res.sendStatus(save ? 200 : 500);
        }
    }
    catch(error)
    {
        return res.json({error})
    }
}

exports.newBlog = async function(req, res) {
    try
    {
        console.log(req.body)

        var blog = new Blog(req.body.blog)

        var saveBlog = await blog.save();

        return res.json({saveBlog})
    }
    catch(error)
    {
        return res.sendStatus(400)
    }
}