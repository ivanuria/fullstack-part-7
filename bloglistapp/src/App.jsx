import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
// Components
import Blogs from './Views/Blogs.jsx'
import Blog from './Views/Blog.jsx'
import Header from './components/Header'
import Login from './Views/Login.jsx'
import NewBlog from './Views/NewBlog.jsx'
import Notifications from './components/Notification.jsx'
import Users from './Views/Users.jsx'
import User from './Views/User.jsx'
// Actions
import { setNotification } from './reducers/notifications.js'
import { getLoggedInUser, logout } from './reducers/user.js'
import { setInitialUsers } from './reducers/users.js'
import { setInitialBlogs } from './reducers/blogs.js'
import { loggedInUser } from './reducers/user.js'
//MUI
import CssBaseline from '@mui/material/CssBaseline'
import {
  Box,
  Container,
  Paper
} from '@mui/material'

const initialNotifications = [
  {
    message: 'Welcome to Blog List App',
  },
]

const App = () => {
  const dispatch = useDispatch()
  const user = loggedInUser()
  useSelector(state => state.user)

  useEffect(() => {
    dispatch(getLoggedInUser())
    dispatch(setInitialUsers())
    dispatch(setInitialBlogs())
    for (const notification of initialNotifications) {
      console.log('set')
      dispatch(
        setNotification(notification.message, { level: notification.level }),
      )
    }
  }, [])

  return (
    <>
      <CssBaseline />
      <Notifications />
      <Header />
      <Box
        component='main'
      >
        <Container>
            <Paper
              elevation={6}
              sx={{
                my: '1rem',
                p: '2rem 1rem'
              }}
            >
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
                path='/blogs/:id'
                element={<Blog />}
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
              <Route path='/users/:id' element={<User />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </Paper>
        </Container>
      </Box>
    </>
  )
}

export default App
