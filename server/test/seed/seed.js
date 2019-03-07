const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    name: 'darrenSeed',
    email: 'darren@test.com',
    password: 'darren',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
    },{
    _id: userTwoId,
    name: 'DawnSeed',
    email: 'dawn@test.com',
    password: 'dawn'    
}];

const todoos = [{
    _id: new ObjectID(),
    task: 'First test toto'
}, {
    _id: new ObjectID(),
    task: 'Second test toto',
    completed: true,
    completedAt: 335
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todoos);
    })
    .then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();
        
        Promise.all([userOne, userTwo])
    }).then(() => done());
};
 
module.exports = {todoos, populateTodos, users, populateUsers};