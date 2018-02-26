import mongoose from 'mongoose'
import config from './config'

const connectDB = async () => {
  try {
    mongoose.set('debug', config.debug)
    mongoose.Promise = global.Promise
    await mongoose.connect(config.mongoUri)
    console.log('Connection succuss: ' + config.mongoUri)
  } catch (error) {
    console.log('Connection failed: ' + error)
  }
}

export default connectDB
