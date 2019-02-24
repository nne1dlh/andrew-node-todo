const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('unable to connect to db server');
    }
    console.log('connected to mongodb server');
    const db = client.db('TodoApp');

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5c71b05f50dae1163836a76f')
    },
    {
        $set: {
            name: 'Darren'
        },
        $inc: {
            age: 1
        }

    },
    {
      returnOriginal: false  
    })
    .then((resx) => {
        console.log(resx);
    });



//client.close();
});
//5c71b05f50dae1163836a76f