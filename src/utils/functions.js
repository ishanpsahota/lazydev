
var ellipses = ['01', '02', '03', '04'];


exports.randomIndex = function(array) {

    var len = array.length;
    var i = Math.floor(Math.random() * len);
    console.log(array[i]);
    return array[i];
}

exports.capitalize = (phrase) => {
    return phrase.charAt(0).toUpperCase() + phrase.slice(1);
}

exports.randomColor = () => {
    var num = '1234567890'
    var alpha = 'abcdef'
    var dark = '012345'    
    var color = '#'
    
    for(var i = 0; i < 6; i++) {
        let  index = Math.ceil(Math.random() * 10)        

        if(i == 0) color += dark.substr(Math.floor(Math.random() * 6), 1)
        else if(i == 1) color += dark.substr(Math.floor(Math.random() * 6), 1)
        else if(i == 2) color += dark.substr(Math.floor(Math.random() * 6), 1)
        else {
            
            if(index % 2 == 0) {            
                color += num.substr(Math.floor(Math.random() * 10), 1);            
            }        
            else {
                color += alpha.substr(Math.floor(Math.random() * 6), 1)            
            }
        }
    }

    // console.log(color);
    return color
}

exports.getTitle = (title) => {    
    return title.split(" ").join("-");    
}

exports.toLowerCase = (phrase) => {
    return phrase.toLowerCase()
}

exports.getAuthor = (author) => {
    return author.toLowerCase().split(" ").join("")
}

exports.getDate = (date, withoutHyphen) => {
    // console.log(date)
    if(withoutHyphen)
      return date.split("T")[0].split("-").join("_");
    else return date.split("T")[0]
}

exports.getId = (heading) => {    
    var array = heading.split(" ");
    if(array.length == 1) {
        let s = heading.charAt(0).toUpperCase();
        for(var j = 1; j < heading.length; j++) {
            s +=  heading[j]
        }

        return s;
    }
    else {
        for(var i = 0; i < array.length; i++) {
        array[i] = array[i].split("-").join("")
        let str = array[i]        
        // console.log(str)
        let new_str = str[0].toUpperCase();
        for(var j = 1; j < str.length; j++) {
            new_str +=  str[j]
        }
        array[i] = new_str;
        // console.log(array[i])
        }

        return array.join("")
    }
},

exports.renderText = function(text) {
    return text.replace(/\n/g, "<br />");
}