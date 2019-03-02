const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const Todo = require('./../models/todo').Todo;

const todoos = [{
    _id: new ObjectID(),
    task: 'First test toto'
}, {
    _id: new ObjectID(),
    task: 'Second test toto'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todoos);
    })
    .then(() => done());
});

describe('POST /todos', () => {
    it('should create new todo', (done) => {
        var text = 'test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.task).toBe(text);
            })
            .end((err,res) => {
                if(err) {
                    return done(err);
                }
                Todo.find({task: text}).then((x) => {
                    expect(x.length).toBe(1);
                    expect(x[0].task).toBe(text);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
           });
    });
    it('shoud not create task with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res) => {
                if(err) {
                  return done(err);
                }
                Todo.find().then((x) => {
                    expect(x.length).toBe(2);
                    done();
                })
                .catch((err) => done(err));
            });
    });
});

    describe('GET /todos', () => {
        it('should get all todos', (done) => {
            request(app)
                .get('/todos')
                .expect(200)
                .expect((resx) => {
                    expect(resx.body.todos.length).toBe(2);
                })
                .end(done);
        });
    });

    describe('GET /todos/:id', () => {
        it('should return one task doc', (done) => {
            request(app)
                .get(`/todos/${todoos[0]._id.toHexString()}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo.text).toBe(todoos[0].text);
                })
                .end(done);
        });

        it('should return 404 if todo not found', (done) => {
            var hexId = new ObjectID().toHexString();
            request(app)
                .get(`/todos/${hexId}`)
                .expect(404)
                .end(done);
        });

        it('should retunf 404 for non-object ids', (done) => {
            request(app)
                .get('/todos/123abc')
                .expect(404)
                .end(done);
        });
    });

    describe('DELETE /todos/:id', () => {
        it('should delete one task', (done) => {
            var hexId = todoos[1]._id.toHexString();

            request(app)
                .delete(`/todos/${hexId}`)
                .expect(200)
                .expect((resx) => {
                    expect(resx.body.todo._id).toBe(hexId);
                })
                .end((err,resx) => {
                    if(err) {
                        return done(err);
                    }
                    Todo.findById(hexId).then((x) => {
                        console.log("@@@@@@@@@@@@@@@@@", x);
                        expect(x).toBeNull();
                        done();
                    })
                    .catch((err) => done(err));
                });
        });

         it('shouldl return 404 if todo not found', (done) => {
            var hexId = new ObjectID().toHexString();
            request(app)
                .delete(`/todos/${hexId}`)
                .expect(404)
                .end(done);
         });

        it('shoud return 404 if ID is invlid', (done) => {
            request(app)
                .delete('/todos/123abc')
                .expect(404)
                .end(done);
        });
    });



