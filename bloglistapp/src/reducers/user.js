import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from '../reducers/notifications'

export const loggedInUser = () => {
  let lsUser = window.localStorage.getItem('bau')
  if (lsUser) {
    lsUser = JSON.parse(lsUser)
    const expiresAt = new Date(lsUser.expiresAt)
    const now = new Date()
    if (expiresAt >= now) {
      return lsUser
    } else {
      window.localStorage.removeItem('bau')
    }
  }
}

const userSlice = createSlice({
  name: ['user'],
  initialState: null,
  reducers: {
    getLoggedInUser() {
      return loggedInUser()
    },
    logout() {
      window.localStorage.removeItem('bau')
      return null
    },
    saveLogin(state, action) {
      window.localStorage.setItem('bau', JSON.stringify(action.payload))
      return action.payload
    },
  },
})

export const { getLoggedInUser, logout, saveLogin } = userSlice.actions

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('bau', JSON.stringify(user))
      dispatch(saveLogin(user))
      dispatch(setNotification('Correctly Logged In'))
    } catch (error) {
      dispatch(
        setNotification('Invalid username and password', { level: 'error' }),
      )
    }
  }
}

export default userSlice.reducer
