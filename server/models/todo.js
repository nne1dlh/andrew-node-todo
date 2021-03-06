var mongooz = require('mongoose');

var Todo = mongooz.model('Todo', {
    task: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false

    },
    completedAt: {
        type: Number,
        default: null
    },
    _creator: {
        type: mongooz.Schema.Types.ObjectId,
        required: true,
    }
});

module.exports = {Todo};