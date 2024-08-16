const bcrypt = require('bcrypt')
const config = require('../utils/config')
const User = require('../models/users')

const deleteAllUsers = async () => {
  await User.deleteMany({})
}

const getAllUsers = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const getUserByUsername = async (username, raw = false) => {
  const user = await User.findOne({ username })
  if (raw) {
    return user
  }
  return user.toJSON()
}

const getUser = async (id, raw = false) => {
  const user = await User.findById(id)
  if (raw) {
    return user
  }
  return user.toJSON()
}

const updateUser = async (id, newData) => {
  await User.findByIdAndUpdate(id, newData)
}

const rootUser = {
  username: 'root',
  password: 'iamroot',
  name: 'I am ROOT',
}

const otherUser = {
  username: 'despistaos',
  password: 'fisicaoquimica',
  name: 'Despistaos',
}

const addUser = async user => {
  const { username, name, password } = user
  const passwordHash = await bcrypt.hash(password, config.SALT_ROUNDS) // Repeated
  const newUser = new User({
    username,
    name,
    passwordHash,
  })
  return await newUser.save()
}

module.exports = {
  addUser,
  deleteAllUsers,
  getAllUsers,
  getUserByUsername,
  updateUser,
  rootUser,
  otherUser,
  getUser,
}
