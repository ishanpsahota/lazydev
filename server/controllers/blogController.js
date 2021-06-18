const bcrypt = require('bcryptjs')
const utils = require('../utils');

// modals
const Blog = require('../models/blog')
const Log = require('../models/logs');
const Category = require('../models/categories')

exports.getAllBlogs = async function (req, res) {  
    Blog.find({'showStatus' : true}, [ 'title', 'image', 'category' ]).
    then((blogs) => {        
        return res.json({blogs})
    }).catch((error) => {
        console.log(error)
        return res.sendStatus(404);
    })
}

exports.getSingleBlog = async function(req, res) {    
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

        var result = await blog.save();

        return res.json({result})
    }
    catch(error)
    {
        return res.sendStatus(400)
    }
}

exports.getCategories = async (req, res) => {
    try
    {
        let categories = await Category.find();

        return res.json({categories})
    }
    catch(error)
    {
        return res.json({error})
    }
}

exports.getSimilarBlogs = async (req, res) => {
    try {
        // let type = req.query.type
        let phrase = req.query.phrase     
        let match = req.query.match           
        let blogs = await Blog.find({'category': phrase.toLowerCase(), 'title': { $ne: utils.getTitleforSearch(match) }}, ['title', 'category', 'image'], { sort: { date: -1 } }).limit(10)
        return res.json({blogs})                
    }
    catch(err) {
        return res.json({err})
    }
}

exports.getTrending = async (req, res) => {
    try {

        let category = req.query.category
        let limit = req.query.limit        

        var blogs = ''

        if(category) {
            blogs = await Blog.find({'category': category}, ['title', 'image', 'category'], {sort: { hits: -1 }}).limit(limit ? limit : '')
        }
        else blogs = await Blog.find(null, ['title', 'image', 'category'], {sort: { hits: -1 }}).limit(limit ? Number(limit) : '')        

        return res.json({blogs})
    }
    catch(err) {
        return res.json({err})
    }
}

exports.search = async (req, res) => {
    try
    {
        var query = req.query.q      
        var type = req.query.type          

        var results = ''

        if(query) {

            // if(type == 'date') {
            //     let q = query.split("_");  
            //     let d = new Date(2021, 5, 23)
            //     console.log(q)
            //     console.log(new Date(2021, 05, 23))
            //     console.log(d)
            //     console.log(new Date( Number(q[0]), Number(q[1]), Number(q[2])))              
            //     results = await Blog.find({ "date": { $gte: new Date(q[0], q[1], q[2]) } }, ['title', 'image', 'category'] );
            // }
            // else 
            console.log(query)
            // results = await Blog.find(null, ['title', 'image', 'category'],{ $or: [{ 'title': query }, { 'category': query }] })
            results = await Blog.find(
                { $text: { $search : query } }, 
                [ 'title', 'image', 'category' ],
                { score : { $meta: "textScore" } 
                } 
            ).sort( 
                {  score: { $meta : 'textScore' } }
            )
            // results = await Blog.find()

            // console.log(results)
            
            return res.json({blogs: results})
        }
        else {
            results = await Blog.find( null , ['title', 'image', 'caategory'])
            return res.json({blogs: results})
        }
    }
    catch(error) {
        return res.json({error})
    }
}

exports.getNew = async (req, res) => {

    try {

        let limit = req.query.limit

        let blogs = await Blog.find(null, [ 'title', 'image', 'category'], { $sort: { date: -1 } }).limit(limit ? Number(limit) : '')
        return res.json({blogs})
    }
    catch(error) {
        return res.json(error)
    }

}