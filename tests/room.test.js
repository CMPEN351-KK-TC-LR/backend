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

describe ('room tests', () => {
    // Begin root level unit tests
    it('sends 400 error with no body /api/rooms/create-room',  function testCreateRoom(done) {
        agent
            .post("/api/rooms/create-room")
            .expect(400, done)
        })
        
    it('sends 400 error if room number is >250', (done) => {
        const room = {
            number: 251,
            specialRoom: true
        }
        agent
            .post('/api/rooms/create-room')
            .send(room)
            .expect(400, done)
    })

    it('sends 400 error if room number is <1', (done) => {
        const room = {
            number: 0,
            specialRoom: false
        }
        agent
            .post('/api/rooms/create-room')
            .send(room)
            .expect(400, done)
    })

    it('sends 400 error with no body /api/rooms/delete-room',  function testDeleteRoom(done) {
        agent
            .post("/api/rooms/delete-room")
            .expect(400, done)
        })

    it('sends 400 error if room number is >250', (done) => {
        const room = {
            number: 251,
            specialRoom: true
        }
        agent
            .post('/api/rooms/create-room')
            .send(room)
            .expect(400, done)
    })

    it('sends 400 error if room number is <1', (done) => {
        const room = {
            number: 0,
            specialRoom: false
        }
        agent
            .post('/api/rooms/create-room')
            .send(room)
            .expect(400, done)
    })

    it('sends 400 error with no body /api/rooms/reserve-room',  function testReserveRoom(done) {
        agent
            .post("/api/rooms/reserve-room")
            .expect(400, done)
        })

    it('sends 400 error if room number is invalid number', (done) => {
        var meetingDate = "Monday 3:00 am"

        const room = {
            number: 251,
            meetingDate
        }
        agent
            .post('/api/rooms/reserve-room')
            .send(room)
            .expect(400, done)
    })

    it('sends 404 error if room number is invalid type', (done) => {
        var meetingDate = "Monday 3:00 am"
        
        const room = {
            number: true,
            meetingDate
        }
        agent
            .post('/api/rooms/reserve-room')
            .send(room)
            .expect(400, done)
    })
})