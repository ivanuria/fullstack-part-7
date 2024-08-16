import { createSlice } from '@reduxjs/toolkit'

const generateId = () => {
  return (+new Date()).toString(36)
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    createNotification(state, action) {
      console.log('createNotification')
      const content = action.payload
      state.push(content)
    },
    deleteNotification(state, action) {
      console.log('deleteNotification')
      const id = action.payload
      return state.filter(s => s.id.toString() !== id.toString())
    },
  },
})

export const { createNotification, deleteNotification } =
  notificationsSlice.actions

export const setNotification = (
  message,
  { timeout = 5, level = 'info' } = {},
) => {
  return async dispatch => {
    console.log('setNotification', message)
    const id = generateId()
    dispatch(createNotification({ message, level, id }))
    setTimeout(() => dispatch(deleteNotification(id)), timeout * 1000)
  }
}

export default notificationsSlice.reducer
