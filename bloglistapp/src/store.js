import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notifications'
import blogsReducer from './reducers/blogs'
import userReducer from './reducers/user'

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
})

console.log(store.getState())

export default store
