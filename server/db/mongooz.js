var mongooz = require('mongoose');

mongooz.Promise = global.Promise;
mongooz.connect('mongodb://localhost:27017/TodoApp');

module.exports = { mongoose: mongooz};