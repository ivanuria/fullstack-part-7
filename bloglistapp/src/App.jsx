import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, Navigate, useMatch } from 'react-router-dom'
// Components
import Blogs from './Views/Blogs.jsx'
import Login from './Views/Login.jsx'
import NewBlog from './Views/NewBlog.jsx'
import Notifications from './components/Notification.jsx'
import Users from './Views/Users.jsx'
import User from './Views/User.jsx'
// Actions
import { setNotification } from './reducers/notifications.js'
import { getLoggedInUser, logout } from './reducers/user.js'
import { setInitialUsers } from './reducers/users.js'

const initialNotifications = [
  {
    message: 'Welcome to Blog List App',
  },
]

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  console.log('appUsers', users)
  const matchUsers = useMatch('/users/:id')
  const matchUsersId = matchUsers && matchUsers.params && matchUsers.params.id

  useEffect(() => {
    dispatch(setInitialUsers())
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

  return (
    <div>
      <h1>Blogs app</h1>
      <Notifications />
      <nav>
        <menu>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/blogs'>Blogs</Link>
          </li>
          <li>
            <Link to='/blogs/new'>Add New Blog</Link>
          </li>
          <li>
            <Link to='/users'>Users</Link>
          </li>
          {user ? (
            <li>
              <b>{user.name}</b> logged in{' '}
              <button style={{ marginLeft: '1ch' }} onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to='/users'>Login</Link>
            </li>
          )}
        </menu>
      </nav>

      <Routes>
        <Route
          path='/'
          element={
            user ? (
              <Navigate replace to='/blogs' />
            ) : (
              <Navigate replace to='/login?redirect=/' />
            )
          }
        />
        <Route
          path='/blogs'
          element={
            user ? <Blogs /> : <Navigate replace to='/login?redirect=/blogs' />
          }
        />
        <Route
          path='/blogs/new'
          element={
            user ? (
              <NewBlog />
            ) : (
              <Navigate replace to='/login?redirect=/blogs/new' />
            )
          }
        />
        <Route
          path='/users'
          element={
            user ? <Users /> : <Navigate replace to='/login?redirect=/users' />
          }
        />
        <Route path='/users/:id' element={<User id={matchUsersId} />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
