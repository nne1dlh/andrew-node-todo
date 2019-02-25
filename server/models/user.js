var mongooz = require('mongoose');

var Userp = mongooz.model('Users', {
    name: {
        type: String,
        required: true, 
        trim: true,
        minlength: 3

    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {User: Userp};