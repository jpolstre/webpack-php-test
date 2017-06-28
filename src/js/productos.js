require('../css/productos.styl');
let $ = require('jquery');
let a = [1,2,3,4,5,6,7,8,9,10];
for (var index = 0; index < 1000; index++) {
  $(`<p>Parrafo ${index}</p>`).appendTo('#container');
  
}
