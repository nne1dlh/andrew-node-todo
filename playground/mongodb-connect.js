//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('unable to connect to db server');
    }
    console.log('connected to mongodb server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Get groceries',
    //     completed: false
    // }, (err, resx) => {
    //     if(err) {
    //         return console.log('unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(resx.ops, undefined, 2));
    // });
    // client.close();
    // });

//     db.collection('Users').insertOne({
//         name: 'Darren',
//         age: 55,
//         city: 'Saco'
//     }, (err, res) => {
//         if(err) {
//             return console.log('unable to insert user document')
//         }
//         console.log(res.ops[0]._id.getTimestamp());
//     });
//     client.close();
});