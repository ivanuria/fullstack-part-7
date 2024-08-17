const blogsRoutes = require('express').Router()
const Blog = require('../models/blogs')
const { updateUser } = require('../utils/user_helper')
const middleware = require('../utils/middleware')
const errors = require('../utils/errors')

blogsRoutes.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })

  response.json(blogs)
})

blogsRoutes.post('/', middleware.restricted, async (request, response) => {
  const user = request.user

  const postToUpload = {
    ...request.body,
    user: user.id,
  }

  const blog = new Blog(postToUpload)

  const result = await blog.save()

  await updateUser(user.id, {
    blogs: user.blogs.concat(result._id.toString()),
  })

  const finalBlog = await Blog.findById(result._id.toString()).populate('user', {
    username: 1,
    name: 1,
  })

  response.status(201).json(finalBlog)
})

blogsRoutes.get('/:id', async (request, response) => {
  const blogPost = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  })
  if (!blogPost) {
    return response.status(404).json({
      error: {
        code: '404',
        message: 'Unfound blogpost',
      },
    })
  }
  response.status(200).json(blogPost)
})

blogsRoutes.delete('/:id', middleware.restricted, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== user.id) {
    return response.status(401).json(errors.getError('401'))
  }

  await blog.deleteOne()

  await updateUser(user.id, {
    blogs: user.blogs.filter(id => id.toString() !== request.params.id),
  })

  response.status(204).end()
})

blogsRoutes.put('/:id', async (request, response) => {
  const { title, author, url, likes, user } = request.body
  const newBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes, user },
    { new: true, runValidators: true, context: 'query' },
  ).populate('user', {
    username: 1,
    name: 1,
  })

  response.status(200).json(newBlog)
})

module.exports = blogsRoutes
