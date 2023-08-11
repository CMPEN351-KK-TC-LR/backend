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

describe ('paymentMethod tests', () => {
    // Begin root level unit tests
    it('sends 400 error with no body /api/paymentMethod/create-paymentMethod',  function testCreatePaymentMethod(done) {
         agent
            .post("/api/paymentMethod/create-paymentMethod")
            .expect(400, done)
        })

    it('sends 404 error if _id is invalid', (done) => {
        var expirationDate = new Date()
        
        const paymentMethod = {
            _id: "1567823abed2",
            cardNumber: 12345,
            ccv: 120,
            expirationDate,
            nameOnCard: "Bob Jr."
        }
        agent
            .post('/api/paymentMethod/create-paymentMethod')
            .send(paymentMethod)
            .expect(404, done)
    })

    it('sends 400 error if cardNumber is <0', (done) => {
        var expirationDate = new Date()
        
        const paymentMethod = {
            _id: new mongoose.Types.ObjectID(),
            cardNumber: -1,
            ccv: 120,
            expirationDate,
            nameOnCard: "Bob Jr."
        }
        agent
            .post('/api/paymentMethod/create-paymentMethod')
            .send(paymentMethod)
            .expect(400, done)
    })

    it('sends 400 error if ccv is <0', (done) => {
        var expirationDate = new Date()
        
        const paymentMethod = {
            _id: new mongoose.Types.ObjectID(),
            cardNumber: 12345,
            ccv: -1,
            expirationDate,
            nameOnCard: "Bob Jr."
        }
        agent
            .post('/api/paymentMethod/create-paymentMethod')
            .send(paymentMethod)
            .expect(400, done)
    })

    it('sends 400 error if ccv is >999', (done) => {
        var expirationDate = new Date()
        
        const paymentMethod = {
            _id: new mongoose.Types.ObjectID(),
            cardNumber: 12345,
            ccv: 1000,
            expirationDate,
            nameOnCard: "Bob Jr."
        }
        agent
            .post('/api/paymentMethod/create-paymentMethod')
            .send(paymentMethod)
            .expect(400, done)
    })

    it('sends 400 error with no body /api/paymentMethod/update-paymentMethod',  function testUpdatePaymentMethod(done) {
        agent
           .post("/api/paymentMethod/update-paymentMethod")
           .expect(400, done)
       })

    it('sends 404 error if _id is invalid', (done) => {
        const paymentMethod = {
            _id: "1567823abed2",
            cardNumber: 12345
        }
        agent
            .post('/api/paymentMethod/update-paymentMethod')
            .send(paymentMethod)
            .expect(404, done)
    })

    it('sends 400 error if cardNumber is <0', (done) => {
        const paymentMethod = {
            _id: new mongoose.Types.ObjectID(),
            cardNumber: -1
        }
        agent
            .post('/api/paymentMethod/update-paymentMethod')
            .send(paymentMethod)
            .expect(400, done)
    })

    it('sends 400 error if ccv is <0', (done) => {
        const paymentMethod = {
            _id: new mongoose.Types.ObjectID(),
            ccv: -1
        }
        agent
            .post('/api/paymentMethod/update-paymentMethod')
            .send(paymentMethod)
            .expect(400, done)
    })

    it('sends 400 error if ccv is >999', (done) => {
        const paymentMethod = {
            _id: new mongoose.Types.ObjectID(),
            ccv: 1000
        }
        agent
            .post('/api/paymentMethod/update-paymentMethod')
            .send(paymentMethod)
            .expect(400, done)
    })

    it('sends 400 error with no body /api/paymentMethod/charge-specialroom',  function testChargeSpecialRoom(done) {
        agent
           .post("/api/paymentMethod/charge-specialRoom")
           .expect(400, done)
       })

    it('sends 404 error if id is invalid', (done) => {
        const id = "s5678kmnh2a3"
        agent
            .post('/api/paymentMethod/charge-specialroom')
            .send(id)
            .expect(404, done)
    })

    it('sends 400 error if id cannot be found', (done) => {
        const id = new mongoose.Type.ObjectID()
        agent
            .post('/api/paymentMethod/charge-specialroom')
            .send(id)
            .expect(400, done)
    })
})