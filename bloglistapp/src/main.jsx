import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notifications'
import blogsReducer from './reducers/blogs'

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogsReducer,
  },
})

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
