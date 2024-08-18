import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
// Components
import Blogs from './components/Blogs'
import Login from './components/Login'
import NewBlog from './components/NewBlog.jsx'
import Notifications from './components/Notification.jsx'
// Actions
import { setNotification } from './reducers/notifications.js'
import { getLoggedInUser, logout } from './reducers/user.js'

const initialNotifications = [
  {
    message: 'Welcome to Blog List App',
  },
]

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const newBlogRef = useRef()

  useEffect(() => {
    dispatch(getLoggedInUser())
    for (const notification of initialNotifications) {
      console.log('set')
      dispatch(
        setNotification(notification.message, { level: notification.level }),
      )
    }
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setNotification('Correctly Logged Out'))
  }

  const Users = () => {
    return null
  }

  return (
    <div>
      <h2>Blogs app</h2>
      <Notifications />
      <BrowserRouter>
        <nav>
          <menu>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/blogs'>Blogs</Link></li>
            <li><Link to='/blogs/new' >Add New Blog</Link></li>
            <li><Link to='/users'>Users</Link></li>
            {
              user
                ? (<li><b>{user.name}</b> logged in{' '}
                  <button style={{ marginLeft: '1ch' }} onClick={handleLogout}>
                    Logout
                  </button></li>)
                :<li><Link to='/users'>Login</Link></li>
            }
          </menu>
        </nav>

        <Routes>
          <Route path='/' element={user ? <Navigate replace to='/blogs' /> : <Navigate replace to='/login?redirect=/' />} />
          <Route path='/blogs' element={user ? <Blogs /> : <Navigate replace to='/login?redirect=/blogs' />} />
          <Route path='/blogs/new' element={user ? <NewBlog /> : <Navigate replace to='/login?redirect=/blogs/new' />} />
          <Route path='/users' element={user ? <Users /> : <Navigate replace to='/login?redirect=/users' />} />
          <Route path='/login' element={<Login />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
