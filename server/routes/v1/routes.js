const express = require('express')
const routes = express.Router();

// controllers
const WebController = require('../../controllers/webController');
const BlogController = require('../../controllers/blogController')

// default route
routes.get('/', function(req, res) {    
    res.status(200).json({msg: 'Yup. working'});
})

// System routes
routes.get('/status', WebController.status)
routes.put('/status/shutdown', WebController.turnSysDown);
routes.put('/status/turnon', WebController.turnSysUp);

// blog routes
routes.get('/blogs', BlogController.getAllBlogs);
routes.get('/blogs/:title', BlogController.getSingleBlog);
routes.get('/blogs/hit/:title', BlogController.hitBlog);
routes.put('/blogs/save/:title', BlogController.saveUnsaveBlog);
routes.put('/blogs/save/:title/block/:id', BlogController.saveBlock);
routes.put('/blogs/status/change/:title', BlogController.showHideBlog);
routes.post('/blogs/new', BlogController.newBlog);

module.exports = routes;