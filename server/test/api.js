/* global before, beforeEach, describe, it */

const app = require('../server');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest')(app);

let Hello = {};

const message = 'Hello World';

describe('Basic Tests', () => {
    before(() => {
        Hello = app.models.Hello;
    });

    beforeEach((done) => {
        Hello.upsert({'message': message}, () => done());
    }); 

    it('Get messages', (done) => {
        request.get('/api/Hellos')
            .expect(200)
            .end((error, res) => {
                if (error) {
                    throw(error);
                }

                expect(res.body).to.have.lengthOf(1);
                done();
            });
    });

    it('Get message', (done) => {
        request.get('/api/Hellos/1')
            .expect(200)
            .end((error, res) => {
                if (error) {
                    throw(error);
                }

                expect(res.body).to.have.property('message');
                expect(res.body.message).to.be.a('string');
                expect(res.body.message).to.equal(message);
                done();
            });
    });
});
