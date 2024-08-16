import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    createBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      return state.filter(s => s.id.toString() !== action.payload.toString())
    },
    updateBlog(state, action) {
      return state.map(s =>
        s.id.toString() !== action.payload.toString() ? s : action.payload,
      )
    },
  },
})

export const { setBlogs, createBlog, deleteBlog, updateBlog } =
  blogsSlice.actions

export const setInitialBlogs = () => {
  return async dispatch => {
    const initialBlogs = await blogService.getAll()
    dispatch(setBlogs(initialBlogs))
  }
}

export const createNewBlog = (newBlog, user) => {
  return async dispatch => {
    const savedBlog = await blogService.newBlog(newBlog, user)
    if (savedBlog) {
      dispatch(
        createBlog({
          ...savedBlog,
          user: { id: user.id, name: user.name, username: user.username },
        }),
      )
    }
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const savedBlog = await blogService.updateBlog(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(updateBlog(savedBlog))
  }
}

export const removeBlog = (id, user) => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(id, user)
    } catch (error) {
      console.log(error.message)
      throw error
    }
    dispatch(deleteBlog(id))
  }
}

export default blogsSlice.reducer
