const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('unable to connect to db server');
    }
    console.log('connected to mongodb server');
    const db = client.db('TodoApp');
    //delete many
    // db.collection('Todos').deleteMany({text: 'Learn Router'})
    //     .then((resx) => {
    //         console.log(resx);
    //     });


    //deleteOne
    //  db.collection('Todos').deleteOne({text: 'Learn Router'})
    //     .then((result) => {
    //         console.log(result);
    //     });


    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false})
    //     .then((result) => {
    //         console.log(result);
    //     });

    // db.collection('Users').deleteMany({name: 'Darren'})
    //     .then(console.log("users Darren deleted"));
        

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5c71b83e6b569f4faca8e3d8')
    }).then((resx) => {
        console.log(JSON.stringify(resx, undefined, 2));
    });
        

    //client.close();
    //5c71b83e6b569f4faca8e3d8

});