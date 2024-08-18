import crudSlice from './crudSlice'
import crudService from '../services/crud'

const usersSlice = crudSlice('users', [])

const { createUser, readUser, updateUser, deleteUser } = crudService('user', '/api/users')
export const { setUsers, createUsers, deleteUsers, updateUsers } =
  usersSlice.actions

export const setInitialUsers = () => {
  return async dispatch => {
    const initialUsers = await readUser()
    dispatch(setUsers(initialUsers))
  }
}

export const setUser = (id) => {
  return async dispatch => {
    const initialUsers = await readUser(id)
    dispatch(setUsers([initialUsers]))
  }
}

export const createNewUser = (newUser) => {
  return async dispatch => {
    const savedUser = await createUser(newUser)
    if (savedUser) {
      dispatch(
        createUsers({
          ...savedUser,
        }),
      )
    }
  }
}

export const removeUser = (id) => {
  return async dispatch => {
    try {
      await deleteUser(id)
    } catch (error) {
      console.log(error.message)
      throw error
    }
    dispatch(deleteUsers(id))
  }
}

export const patchUser = (id) => {
  return async dispatch => {
    try {
      await updateUser(id)
    } catch (error) {
      console.log(error.message)
      throw error
    }
    dispatch(updateUsers(id))
  }
}

export default usersSlice.reducer
