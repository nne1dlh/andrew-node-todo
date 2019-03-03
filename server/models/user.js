const mongooz = require('mongoose');
const vd = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


var UserSchema = new mongooz.Schema({
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
        minlength: 1,
        unique: true,
        validate: {
            validator: vd.isEmail, 
            message: '{VALUE} is not a vaild email'
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 4
   },
   tokens: [{
       access: {
         type: String,
         required: true  
        },
        token: {
            type: String,
            required: true
        }
   }]
});

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email', 'name']);
 };

UserSchema.methods.generateAuthToken = function () {
    var usr = this; //binds individual document
    var access = 'auth';
    var token = jwt.sign({_id: usr._id.toHexString(), access}, 'abc123').toString();
    //console.log("token from model", token);

    usr.tokens = usr.tokens.concat([{access,token}]);
    return usr.save().then(() => {
        console.log("from save");
        return token;
    })

    
    
        
};

UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch(e) {

    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'


    })
}

var Userp = mongooz.model('Users', UserSchema);

module.exports = {User: Userp};