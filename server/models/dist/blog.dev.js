"use strict";

var utils = require('../utils');

var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
  title: {
    type: String
  },
  category: {
    type: String
  },
  intro: String,
  author: String,
  date: {
    type: Date,
    "default": new Date(Date.now())
  },
  liked: {
    type: Boolean,
    "default": false
  },
  image: {
    url: String,
    provider: String
  },
  hits: {
    type: Number,
    "default": 0
  },
  blocks: [{
    heading: String,
    tip: String,
    text: String,
    imageSize: String,
    saved: {
      type: Boolean,
      "default": false
    },
    image: {
      url: String,
      provider: String
    }
  }],
  showStatus: {
    type: Boolean,
    "default": true
  }
});
blogSchema.index({
  'title': 'text',
  'category': 'text',
  'blocks.heading': 'text',
  'blocks.text': 'text'
}, {
  weights: {
    'title': 5,
    'blocks.heading': 4,
    'blocks.text': 3,
    'category': 2
  }
});

blogSchema.statics.createBlog = function (blog_data) {
  if (blog_data) {
    var new_blog = new Blog(blog_data);
    return new_blog.save();
  }
};

blogSchema.statics.showBlog = function (blog_title) {
  if (blog_title) {
    return Blog.findOneAndUpdate({
      title: utils.getTitleforSearch(blog_title)
    }, {
      $set: [{
        'showStatus': true
      }]
    });
  }
};

blogSchema.statics.hideBlog = function (blog_title) {
  if (blog_title) {
    return Blog.findOneAndUpdate({
      title: utils.getTitleforSearch(blog_title)
    }, {
      $set: [{
        'showStatus': false
      }]
    });
  }
};

var Blog = mongoose.model('blogs', blogSchema);
module.exports = Blog;