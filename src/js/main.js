// import '../css/styles.scss'; only ecs6
require('../css/main.styl')
var persons = require('./persons.js');

var $ = require('jquery');
$(document).ready(function(){

$('<h1>HELLO THI IS THE HOME</h1>').appendTo('body');

let p = new persons('test 3234', '5972406f LP');
$('#button').on('click', (ev) => {
    ev.preventDefault();
    // alert(`Hello ${p.name}`);
    let data = p.getData();
    $(`<h2>Nombre: ${data.name}</h2>
    <h2>ID: ${data.id}</h2><hr/>`).appendTo('#content');
});

$('#clear').click((ev) => {
    $('#content').html('');
});
});