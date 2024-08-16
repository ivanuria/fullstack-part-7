import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notifications'

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
  },
})

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
