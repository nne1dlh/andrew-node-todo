var mongooz = require('mongoose');

mongooz.Promise = global.Promise;
mongooz.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = { mongoose: mongooz};