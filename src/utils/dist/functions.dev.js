"use strict";

var ellipses = ['01', '02', '03', '04'];

exports.randomIndex = function (array) {
  var len = array.length;
  var i = Math.floor(Math.random() * len);
  console.log(array[i]);
  return array[i];
};

exports.capitalize = function (phrase) {
  return phrase.charAt(0).toUpperCase() + phrase.slice(1);
};

exports.randomColor = function () {
  var num = '1234567890';
  var alpha = 'abcdef';
  var dark = '012345';
  var color = '#';

  for (var i = 0; i < 6; i++) {
    var index = Math.ceil(Math.random() * 10);
    if (i == 0) color += dark.substr(Math.floor(Math.random() * 6), 1);else if (i == 1) color += dark.substr(Math.floor(Math.random() * 6), 1);else if (i == 2) color += dark.substr(Math.floor(Math.random() * 6), 1);else {
      if (index % 2 == 0) {
        color += num.substr(Math.floor(Math.random() * 10), 1);
      } else {
        color += alpha.substr(Math.floor(Math.random() * 6), 1);
      }
    }
  } // console.log(color);


  return color;
};

exports.getTitle = function (title) {
  return title.split(" ").join("-");
};

exports.toLowerCase = function (phrase) {
  return phrase.toLowerCase();
};