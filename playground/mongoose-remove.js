const mongooz = require('../server/db/mongooz').mongoose;
const {Todo} = require('../server/models/todo');
const User = require('../server/models/user').User;

//const {ObjectID} = require('mongodb');
const ObjId = require('mongodb').ObjectID;

// Todo.remove({}).then((resx) => {
//     console.log(resx);
// });

//will get DOC back
//Todo.findOneAndRemove({})

Todo.findByIdAndRemove('5c7912887ef1429b2560a2d0').then((task) => {
    console.log('THis is deleted task: ', task);
});

Todo.findOneAndRemove({_id: '5c7912887ef1429b2560a2d0'}).then((task) => {

});

