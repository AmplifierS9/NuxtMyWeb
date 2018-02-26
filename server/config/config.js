const config = {
  debug: !(process.env.NODE_ENV === 'production'),
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost/my-blog',
  sessionSecret: 'dev_secret_key1'
}

export default config
