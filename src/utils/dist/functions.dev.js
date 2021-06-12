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

exports.getAuthor = function (author) {
  return author.toLowerCase().split(" ").join("");
};

exports.getDate = function (date, withoutHyphen) {
  // console.log(date)
  if (withoutHyphen) return date.split("T")[0].split("-").join("_");else return date.split("T")[0];
};

exports.getId = function (heading) {
  var array = heading.split(" ");

  if (array.length == 1) {
    var s = heading.charAt(0).toUpperCase();

    for (var j = 1; j < heading.length; j++) {
      s += heading[j];
    }

    return s;
  } else {
    for (var i = 0; i < array.length; i++) {
      array[i] = array[i].split("-").join("");
      var str = array[i]; // console.log(str)

      var new_str = str[0].toUpperCase();

      for (var j = 1; j < str.length; j++) {
        new_str += str[j];
      }

      array[i] = new_str; // console.log(array[i])
    }

    return array.join("");
  }
}, exports.renderText = function (text) {
  return text.replace(/\n/g, "<br />");
};