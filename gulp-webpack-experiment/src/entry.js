require('bootstrap/dist/css/bootstrap.css');
require('./style.css');
require('./app.js');
var add = require('./add');
var sub = require('./sub.babel.js');
var message = require('./2and3is.txt');
console.log(message.trim(), add(2, 3));
console.log('2 and -3 is', sub(2, 3));
