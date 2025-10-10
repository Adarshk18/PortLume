const mongoose = require('mongoose')

const connectDB = async () => {
  const uri = process.env.MONGO_URI
  if (!uri) throw new Error('MONGO_URI missing')

  try {
    await mongoose.connect(uri, { dbName: 'PortLume' })
    console.log('✅ MongoDB connected successfully')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message)
    process.exit(1)
  }
}

module.exports = connectDB
