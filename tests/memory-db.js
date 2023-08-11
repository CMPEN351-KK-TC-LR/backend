const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

const connect = async () => {
  // NOTE: before establishing a new connection close previous
  await mongoose.disconnect()

  mongoServer = await MongoMemoryServer.create()
  const uri = await mongoServer.getUri()
  await mongoose.connect(uri)
}

const close = async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
}

const clear = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    await collections[key].deleteMany()
  }
}

module.exports = {
  connect,
  close,
  clear
}