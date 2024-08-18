import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notifications'
import blogsReducer from './reducers/blogs'

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogsReducer,
  },
})

export default store