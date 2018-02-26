import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const Schema = mongoose.Schema
const saltRounds = 10

let UserSchema = new Schema({
  fullname: {
    type: String,
    required: 'FullName is required'
  },
  username: {
    type: String,
    unique: true,
    index: true,
    validate: [
      (username) => {
        return username && username.length >= 6
      }, 'Password must be at least 6 characters'
    ],
    required: 'Username is required'
  },
  email: {
    type: String,
    required: 'Email is required'
  },
  password: {
    type: String,
    validate: [
      (password) => {
        return password && password.length >= 6
      }, 'Password must be at least 6 characters'
    ]
  },
  created_date: {type: Date, default: Date.now},
  modified_date: {type: Date, default: Date.now},
  image_profile: {
    type: String
  },
  salt: String,
  provider: {
    type: String
  },
  providerId: String,
  providerData: {}
})

UserSchema.pre('save', (next) => {
  if (this.password) {
    this.salt = bcrypt.genSaltSync(saltRounds)
    this.password = this.hashPassword(this.password)
  }
  next()
})

UserSchema.methods.hashPassword = (password) => {
  return bcrypt.hashSync(password, this.salt)
}

UserSchema.methods.authenticate = (password) => {
  return bcrypt.compareSync(password, this.password)
}

UserSchema.statics.findUniqueUsername = (username, suffix, callback) => {
  let _this = this
  let possibleUsername = username + (suffix || '')
  _this.findOne({
    username: possibleUsername
  }, function (err, user) {
    if (!err) {
      if (!user) callback(possibleUsername)
      else return _this.findUniqueUsername(username, (suffix || 0) + 1, callback)
    } else {
      callback(null)
    }
  })
}

let UserModel = mongoose.model('users', UserSchema)

export default UserModel
