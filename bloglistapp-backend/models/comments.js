const { jsonResponseHandler } = require('../utils/helper')
const { Schema, model } = require('mongoose')

commentSchema = new Schema({
  content: {
    type: String,
    minLength: 3
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'Blog'
  }
})

commentSchema.set('toJSON', jsonResponseHandler())

module.exports = model('Comment', commentSchema)