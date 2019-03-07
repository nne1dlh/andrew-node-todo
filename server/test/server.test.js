const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const Todo = require('./../models/todo').Todo;
const {User} = require('../models/user');
const {todoos, populateTodos, users, populateUsers} = require('./seed/seed');




beforeEach(populateUsers);
beforeEach(populateTodos);

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

    describe('PATCH /todos/:id', () => {
        it('should update the todo', (done) => {
            var hexId = todoos[0]._id.toHexString();
            var text = "Finish second bench";
            request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: true,
                task: text
            })
            .expect(200)
            .expect((resx) => {
                expect(resx.body.todo.task).toBe(text);
                expect(resx.body.todo.completed).toBe(true);
                expect(typeof resx.body.todo.completedAt).toBe('number');
            })
            .end(done);
        });

        it('should lear compAt when todo is not complete', (done) => {
            var hexId = todoos[1]._id.toHexString();
            var text = "Finish siding house";
            request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: false,
                task: text
            })
            .expect(200)
            .expect((resx) => {
                expect(resx.body.todo.task).toBe(text);
                expect(resx.body.todo.completed).toBe(false);
                expect(resx.body.todo.completedAt).toBeNull();
            })
            .end(done);
        });
    });

    describe('GET /users/me', () => {
        it('should return user if auth', (done) => {
            request(app)
                .get('/users/me')
                .set('x-auth', users[0].tokens[0].token)
                .expect(200)
                .expect((res) => {
                    expect(res.body._id).toBe(users[0]._id.toHexString());
                    expect(res.body.email).toBe(users[0].email);
                })
                .end(done);
        });
        it('should return 401 if not authenticated', (done) => {
            request(app)
                .get('/users/me')
                .expect(401)
                .expect((res) => {
                    expect(res.body).toEqual({});
                })
                .end(done);
        });
    });

    describe('POST /users', () => {
        it('should create a new user', (done) => {
            var email = 'example@example.com';
            var password = '123mbc';
            var fname = 'Bucky';

            request(app)
                .post('/users')
                .send({email, password, name: fname})
                .expect(200)
                .expect((res) => {
                    expect(res.headers['x-auth']).toBeTruthy();
                    expect(res.body._id).toBeTruthy();
                    expect(res.body.email).toBe(email);
                    expect(res.body.name).toBe(fname);
                })
                //.end(done);
                    .end((err) => {
                    if(err) {
                        return done(err);
                    }
                    User.findOne({email}).then((user) => {
                        expect(user).toBeTruthy();
                        expect(user.password === password).toBeFalsy();
                        
                    }).catch((err) => done(err));
                });
                done();
        });
        it('should return validation errors if req invalid', (done) => {
            request(app)
                .post('/users')
                .send({
                    email:'dawn1@test.com',
                    password: '123abc' 
                })
                .expect(400)
                .end(done);
        });
        it('should not create usr if email taken', (done) => {
            request(app)
                .post('/users')
                .send({
                    name: 'dawn1',
                    email: users[0].email,
                    password: '123abcd'
                })
                .expect(400)
                .end(done);

        });
    });

    describe('POST /users/login', () => {
        it('should login user and return auth token', (done) => {
            request(app)
                .post('/users/login')
                .send({
                    email: users[1].email,
                    password: users[1].password
                })
                .expect(200)
                .expect((res) => {
                    expect(res.headers['x-auth']).toBeTruthy();
                })
                .end((err,res) => {
                    if(err) {
                        return done(err);
                    }
                    User.findById(users[1]._id).then((usr) => {
                        expect(usr.tokens[0]).toMatchObject({
                            access: 'auth',
                            token: res.headers['x-auth']
                        });
                        done();
                    }).catch((err) => done(err));
                });
       });

        it('should reject invalid login', (done) => {
            request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password +'1'
            })
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeFalsy();
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).toBe(0);
                    done();
                })
                .catch((err) => done(err));
            });

        });
    });
   



