// Required imports for unit tests
const request = require('supertest')
const app = require('../server')
const db = require('./memory-db')

// Pass supertest agent for each test
const agent = request.agent(app);

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('user tests', () => {
    // Begin root level unit tests
    it('sends 400 error with no body /api/users/register',  function testRegister(done) {
        agent
            .post("/api/users/register")
            .expect(400, done)
        })
    
    it('sends 400 error with email too short', (done) => {
        const user = {
            name: "Keian Kaserman",
            email: "ks@pennstatesoft.com",
            password: "password123"
        }
        agent
            .post('/api/users/register')
            .send(user)
            .expect(400, done)
    })

    it('sends 400 error with name too short', (done) => {
        const user = {
            name: "ds",
            email: "k.s@pennstatesoft.com",
            password: "password123"
        }
        agent
            .post('/api/users/register')
            .send(user)
            .expect(400, done)
    })

    it('sends 400 error with password too short', (done) => {
        const user = {
            name: "Keian Kaserman",
            email: "k.s@pennstatesoft.com",
            password: "password123"
        }
        agent
            .post('/api/users/register')
            .send(user)
            .expect(400, done)
    })
})
    
  