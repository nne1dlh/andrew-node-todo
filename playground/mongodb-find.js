const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('unable to connect to db server');
    }
    console.log('connected to mongodb server');
    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5c71c0b97ef1429b255f7cfe')})
    //     .toArray().then((docs) => {
    //         console.log('Todos');
    //         console.log(JSON.stringify(docs, undefined,2));
    //     }, (err) => {
    //     console.log('unable to fetch todos', err);  
    //     });

    db.collection('Users').find({name: 'Darren'})
        .toArray()
        .then((x) => {
            console.log(JSON.stringify(x, undefined, 2));   
        }, (err) => {
        console.log('unable to fetch users', err);  
        });
        

    //client.close();

});
