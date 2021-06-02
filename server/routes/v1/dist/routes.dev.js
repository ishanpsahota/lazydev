"use strict";

var express = require('express');

var routes = express.Router(); // controllers

var WebController = require('../../controllers/webController');

var BlogController = require('../../controllers/blogController');

var adminController = require('../../controllers/adminController'); // default route


routes.get('/', function (req, res) {
  res.status(200).json({
    msg: 'Yup. working'
  });
}); // System routes

routes.get('/status', WebController.status);
routes.put('/status/shutdown', WebController.turnSysDown);
routes.put('/status/turnon', WebController.turnSysUp); // blog routes

routes.get('/blogs', BlogController.getAllBlogs);
routes.get('/blogs/:title', BlogController.getSingleBlog);
routes.get('/blogs/hit/:title', BlogController.hitBlog);
routes.put('/blogs/save/:title', BlogController.saveUnsaveBlog);
routes.put('/blogs/save/:title/block/:id', BlogController.saveBlock);
routes.put('/blogs/status/change/:title', BlogController.showHideBlog);
routes.post('/blogs/new', BlogController.newBlog);
routes.get('/blogs/get/categories', BlogController.getCategories);
routes.get('/blogs/get/similar', BlogController.getSimilarBlogs);
routes.get('/blogs/get/trending', BlogController.getTrending);
routes.get('/blogs/get/search', BlogController.search); // admin routes

routes.post('/admin/new/category', adminController.newCategory);
module.exports = routes;