import crudService from '../services/crud'
import crudSlice from './crudSlice'
import { createComment } from '../services/comments'
import { loggedInUser } from '../reducers/user'

const blogsSlice = crudSlice('blogs', [])
const { createBlog, readBlog, updateBlog, deleteBlog } = crudService(
  'blog',
  '/api/blogs',
)
export const { setBlogs, createBlogs, deleteBlogs, updateBlogs } =
  blogsSlice.actions

export const setInitialBlogs = () => {
  return async dispatch => {
    const initialBlogs = await readBlog()
    dispatch(setBlogs(initialBlogs))
  }
}

export const createNewBlog = newBlog => {
  return async dispatch => {
    const user = loggedInUser()
    const savedBlog = await createBlog(newBlog)
    if (savedBlog) {
      dispatch(
        createBlogs({
          ...savedBlog,
          user: { id: user.id, name: user.name, username: user.username },
        }),
      )
    }
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const savedBlog = await updateBlog(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    })
    dispatch(updateBlogs(savedBlog))
  }
}

export const removeBlog = id => {
  return async dispatch => {
    try {
      await deleteBlog(id)
    } catch (error) {
      console.log(error.message)
      throw error
    }
    dispatch(deleteBlogs(id))
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    try {
      const savedBlog = await createComment(id, comment)
    } catch (error) {
      console.log(error.message)
      throw error
    }
    dispatch(updateBlogs(savedBlog))
  }
}

export default blogsSlice.reducer
