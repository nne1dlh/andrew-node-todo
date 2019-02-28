var xpress = require('express');
var bp = require('body-parser');

var {mongoose} = require('./db/mongooz');
var {Todo} = require('./models/todo');
var User = require('./models/user').User;
const {ObjectID} = require('mongodb');

const port =process.env.PORT || 3000;
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

app.get('/todos/:idx', (req,res) =>{
    var id = req.params.idx;
    //vlidate ID using isValid
    if (!ObjectID.isValid(id)){
        res.status(404).send('Invalid task idpiss');
    }
    Todo.findById(id)
        .then((x) => {
            if (!x) {
             return res.status(404).send('task not founded');
            }
             res.send({todo:x});
        })
        .catch((err) => console.log('cannot connect to mongo db',err));

    
});

app.listen(port, () => {
    console.log(`started on port ${port}...`);
});

module.exports = {app};



