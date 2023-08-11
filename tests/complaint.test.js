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

describe ('complaint test', () => {
    // Begin root level unit tests
    it('sends 400 error with no body /api/complaints/update-complaint',  function testUpdateComplaint(done) {
        agent
            .post("/api/complaints/update-complaint")
            .expect(400, done)
         })

    it('sends 404 error if id is invalid', (done) => {
        var resolutionDate = new Date()
        
        const complaint = {
            id: "1ha234mxnwe",
            reply: "Hello testing",
            resolutionDate
        }
        agent
            .post('/api/complaints/update-complaint')
            .send(complaint)
            .expect(404, done)
    })

    it('sends 400 error if reply <10', (done) => {
        var resolutionDate = new Date()
        
        const complaint = {
            id: new mongoose.Type.ObjectID,
            reply: "Hello",
            resolutionDate
        }
        agent
            .post('/api/complaints/update-complaint')
            .send(complaint)
            .expect(400, done)
    })

    it('sends 400 error with no body /api/complaints/create-complaint',  function testCreateComplaint(done) {
        agent
            .post("/api/complaints/create-complaint")
            .expect(400, done)
         })

    it('sends 400 error if subject <10', (done) => {
        const complaint = {
            subject: "Hi",
            email: "tyler4569@pennstatesoft.com",
            message: "This is a test for the system."
        }
        agent
            .post('/api/complaints/create-complaint')
            .send(complaint)
            .expect(400, done)
    })

    it('sends 400 error if email is invalid', (done) => {
        const complaint = {
            subject: "Testing System",
            email: "t@email.com",
            message: "This is a test for the system."
        }
        agent
            .post('/api/complaints/create-complaint')
            .send(complaint)
            .expect(400, done)
    })

    it('sends 400 error if message is <10', (done) => {
        const complaint = {
            subject: "Testing System",
            email: "tyler4569@pennstatesoft.com",
            message: "T."
        }
        agent
            .post('/api/complaints/create-complaint')
            .send(complaint)
            .expect(400, done)
    })
})