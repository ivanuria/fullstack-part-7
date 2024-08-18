import crudSlice from './crudSlice'
import blogService from '../services/blogs'

const blogsSlice = crudSlice('users', [])

export const { setUsers, createUsers, deleteUsers, updateUsers } =
  blogsSlice.actions

export const setInitialUsers = () => {
  return async dispatch => {
    const initialUsers = await usersService.getAll()
    dispatch(setUsers(initialUsers))
  }
}

export const createNewUser = (newUser, user) => {
  return async dispatch => {
    const savedUser = await userService.newBlog(newUser, user)
    if (savedUser) {
      dispatch(
        createUsers({
          ...savedUser,
        }),
      )
    }
  }
}

export const removeUser = (id, user) => {
  return async dispatch => {
    try {
      await blogService.deleteUser(id, user)
    } catch (error) {
      console.log(error.message)
      throw error
    }
    dispatch(deleteUsers(id))
  }
}

export default blogsSlice.reducer
