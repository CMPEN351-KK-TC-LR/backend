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

describe('meeting tests', () => {
    // Begin root level unit tests

    // GetMeetingsTimeSlot
    it('sends 400 error with no body /api/meetings/get-meetings-timeslot',  function testGetMeetingsTimeSlot(done) {
        agent
            .post("/api/meetings/get-meetings-timeslot")
            .expect(400, done)
        })

    it('sends 404 error if time slot is invalid', (done) => {
        const timeSlot = "Test"
        agent
            .post('/api/meetings/get-meetings-timeslot')
            .send(timeSlot)
            .expect(400, done)
    })

    // GetMeetingsUser
    it('sends 400 error with no body /api/meetings/get-meetings-user',  function testGetMeetingsUser(done) {
        agent
            .post("/api/meetings/get-meetings-user")
            .expect(400, done)
        })

    it('sends 404 error if id length is incorrect', (done) => {
        const id = "ahwkem123456"
        agent
            .post('/api/meetings/get-meetings-user')
            .send(id)
            .expect(400, done)
    })

    // GetMeeting
    it('sends 400 error with no body /api/meetings/get-meeting-name',  function testGetMeeting(done) {
        agent
            .post("/api/meetings/get-meeting-name")
            .expect(400, done)
        })

    it('sends 400 error if meeting name <3', (done) => {
        const meetingName = "T"
        agent
            .post('/api/meetings/get-meeting-name')
            .send(meetingName)
            .expect(400, done)
    })

    // CreateMeeting
    it('sends 400 error with no body /api/meetings/create-meeting',  function testCreateMeeting(done) {
        agent
            .post("/api/meetings/create-meeting")
            .expect(400, done)
        })

    it('sends 400 error if meeting name <3', (done) => {
        var time = new Date()
        
        const meeting = {
            name: "T",
            time,
            roomNumber: 1,
            creator: new mongoose.Types.ObjectID()
        }
        agent
            .post('/api/meetings/create-meeting')
            .send(meeting)
            .expect(400, done)
    })

    it('sends 400 error if room number <1', (done) => {
        var time = new Date()
        
        const meeting = {
            name: "Test Meeting",
            time,
            roomNumber: 0,
            creator: new mongoose.Types.ObjectID()
        }
        agent
            .post('/api/meetings/create-meeting')
            .send(meeting)
            .expect(400, done)
    })

    it('sends 400 error if room number >250', (done) => {
        var time = new Date()
        
        const meeting = {
            name: "Test Meeting",
            time,
            roomNumber: 251,
            creator: new mongoose.Types.ObjectID()
        }
        agent
            .post('/api/meetings/create-meeting')
            .send(meeting)
            .expect(400, done)
    })

    it('sends 404 error if id is invalid', (done) => {
        var time = new Date()
        
        const meeting = {
            name: "Test Meeting",
            time,
            roomNumber: 2,
            creator: "hwnexy25679"
        }
        agent
            .post('/api/meetings/create-meeting')
            .send(meeting)
            .expect(404, done)
    })

    // UpdateMeeting
    it('sends 400 error with no body /api/meetings/update-meeting',  function testUpdateMeeting(done) {
        agent
            .post("/api/meetings/update-meeting")
            .expect(400, done)
        })

    it('sends 404 error if meeting name is invalid type', (done) => {
        
        const meeting = {
            name: true
        }
        agent
            .post('/api/meetings/update-meeting')
            .send(meeting)
            .expect(404, done)
    })


    it('sends 404 error if meeting name <3', (done) => {
        
        const meeting = {
            name: "T"
        }
        agent
            .post('/api/meetings/update-meeting')
            .send(meeting)
            .expect(404, done)
    })

    it('sends 400 error if room number <1', (done) => {
        var time = new Date()
        
        const meeting = {
            name: "Test Meeting",
            roomNumber: 0,
        }
        agent
            .post('/api/meetings/update-meeting')
            .send(meeting)
            .expect(400, done)
    })

    it('sends 400 error if room number >250', (done) => {
        
        const meeting = {
            name: "Test Meeting",
            roomNumber: 251
        }
        agent
            .post('/api/meetings/update-meeting')
            .send(meeting)
            .expect(400, done)
    })

    // DeleteMeeting
    it('sends 400 error with no body /api/meetings/delete-meeting',  function testDeleteMeeting(done) {
        agent
            .post("/api/meetings/delete-meeting")
            .expect(400, done)
        })

    it('sends 400 error if meeting name <3', (done) => {
        
        const meeting = {
            name: "T"
        }
        agent
            .post('/api/meetings/delete-meeting')
            .send(meeting)
            .expect(400, done)
    })
})