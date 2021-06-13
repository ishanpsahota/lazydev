"use strict";

var express = require('express');

var routes = express.Router();

var cloudinaryModule = require('cloudinary').v2;

var fs = require('fs');

var multer = require('multer');

var utils = require('../../secret/utils'); // controllers


var WebController = require('../../controllers/webController');

var BlogController = require('../../controllers/blogController');

var adminController = require('../../controllers/adminController');

var cloudinaryConfig = require('../../controllers/cloudinary'); // auth middleware
// const auth = require('../../auth/auth')
// img upload dest


var blogImagePath = multer.diskStorage({
  destination: '/assets/images/blogs',
  filename: function filename(req, file, callback) {
    var ext = file.mimetype.split("/")[1];
    var name = utils.generateString(15) + '.' + ext;
    if (!name) return callback('not able to get name');else callback(null, name);
  }
});
var uploadImg = multer({
  storage: blogImagePath,
  limits: {
    fileSize: 50000000
  }
}); // default route

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
routes.get('/blogs/get/search', BlogController.search);
routes.get('/blogs/get/new', BlogController.getNew);
routes.post('/blogs/upload/image', uploadImg.single('image'), function (req, res) {
  cloudinaryModule.config({
    cloudinaryConfig: cloudinaryConfig
  });
  if (!req.file.path) return res.sendStatus(401);

  if (req.file.path) {
    if (fs.existsSync(req.file.path)) {
      console.log('file found & uploaded'); // return res.json({file: req.file})

      cloudinaryModule.uploader.upload(req.file.path, {
        public_id: 'laazzzyyyy.dev/' + req.file.originalname
      }, function (err, image) {
        if (err) {
          console.log('ce');
          console.log(err);
          return res.status(400).json({
            err: 'File Uploaded x1 but unknown error'
          });
        }

        if (!image) {
          console.log('ni');
          return res.status(404).json({
            err: 'File Uploaded x1 but cloud error'
          });
        }

        if (image) {
          console.log('here');
          console.log(image);
          fs.unlink(req.file.path, function (error) {
            if (error) return res.status(400).json({
              err: 'File Uploaded x2 but delete error'
            });else {
              console.log('file deleted & uploaded x2');
              return res.status(200).json({
                msg: 'File Uploaded & Deleted Successfully',
                path: image.url
              });
            }
          });
        }
      });
    } else return res.sendStatus(404);
  }
}); // admin routes

routes.post('/admin/new/category', adminController.newCategory);
module.exports = routes;