
var ellipses = ['01', '02', '03', '04'];


export function  randomIndex(array) {

    var len = array.length;
    var i = Math.floor(Math.random() * len);
    console.log(array[i]);
    return array[i];
}

