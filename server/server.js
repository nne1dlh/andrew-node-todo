var xpress = require('express');
var bp = require('body-parser');

var {mongoose} = require('./db/mongooz');
var {Todo} = require('./models/todo');
var User = require('./models/user').User;

var app = xpress();

app.use(bp.json());

app.post('/todos', (req,res) => {
    console.log("from server.js",req.body);
    var task = new Todo({
        task: req.body.text //looking for text prop in request
    });
    task.save().then((resx) => {
        console.log("send resx: ", resx);
        res.send(resx);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req,res) => {
    Todo.find().then((x) => {
        res.send({ todos: x});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log('started on port 3000...');
});

module.exports = {app};



