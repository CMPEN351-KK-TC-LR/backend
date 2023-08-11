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
        });
})
    
  