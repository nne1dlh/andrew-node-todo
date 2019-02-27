const mongooz = require('../server/db/mongooz').mongoose;
const {Todo} = require('../server/models/todo');
const User = require('../server/models/user').User;

const {ObjectID} = require('mongodb');

var usrId = '5c73426befd31b87284a04c5';
// var id = '5c75ded8eb29e49cdc0f9d13';

// if(!ObjectID.isValid(id)) {
//     console.log('ID is not valid..');
// }

// Todo.find({
//     _id: id
// }).then((tasks) => {
//     console.log('Tasks are: ', tasks);
// });

// Todo.findOne({
//     _id: id
// }).then((oneTask) => {
//     console.log('The first incomplete is ', oneTask);
// });

// Todo.findById(id).then((resx) => {
//     if(!resx) {
//         return console.log('id not found');
//     }
//     console.log('Task by id: ', resx);
// })
// .catch((err) => console.log(err));

User.findById({
    _id: usrId
}).then((user) => {
    if(!user) {
        return console.log('User not found..');
    }
    console.log('User found by CIA: ', JSON.stringify(user, undefined, 2));
})
.catch((err) => console.log("CAATCH BLOCK ERROR",err));