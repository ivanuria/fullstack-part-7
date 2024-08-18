import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
// Components
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog.jsx'
import Notifications from './components/Notification.jsx'
import Togglable from './components/Togglable.jsx'
// Actions
import { setNotification } from './reducers/notifications.js'
import { setInitialBlogs, createNewBlog } from './reducers/blogs.js'
import { getLoggedInUser, logout } from './reducers/user.js'

const initialNotifications = [
  {
    message: 'Welcome to Blog List App',
  },
]

const App = () => {
  const dispatch = useDispatch()
  const blogs = [...useSelector(state => state.blogs)]
  const user = useSelector(state => state.user)
  const newBlogRef = useRef()
  const [sorted, setSorted] = useState()

  useEffect(() => {
    dispatch(getLoggedInUser())
    for (const notification of initialNotifications) {
      console.log('set')
      dispatch(
        setNotification(notification.message, { level: notification.level }),
      )
    }
  }, [])

  useEffect(() => {
    dispatch(setInitialBlogs())
  }, [user])

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setNotification('Correctly Logged Out'))
  }

  const addToblogs = async newBlog => {
    dispatch(createNewBlog(newBlog))
    dispatch(setNotification(`'${newBlog.title}' correctly added`))
    newBlogRef.current.toggleVisible()
  }

  if (sorted) {
    blogs.sort((a, b) => a.likes - b.likes)
    if (sorted === 'higherFirst') {
      blogs.reverse()
    }
  }

  const handleSortBlogs = () => {
    setSorted(sorted === 'higherFirst' ? 'lowerFirst' : 'higherFirst')
  }

  const Blogs = ({ blogs, handleSortBlogs }) => {
    return (
      <>
      <button onClick={e => handleSortBlogs()}>
          Sort Blogs{' '}
          {sorted === 'higherFirst'
            ? 'from lowest to highest'
            : 'from highest to lowest'}
        </button>
        {blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
      </>
    )
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
            <li><Link to='/blogs/new'>Add New Blog</Link></li>
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
          <Route path='/blogs' element={user ? <Blogs blogs={blogs} handleSortBlogs={handleSortBlogs} /> : <Navigate replace to='/login?redirect=/blogs' />} />
          <Route path='/blogs/new' element={user ? <NewBlog addToBlogs={addToblogs} /> : <Navigate replace to='/loginlogin?redirect=/blogs/new' />} />
          <Route path='/users' element={user ? <Users /> : <Navigate replace to='/login?redirect=/users' />} />
          <Route path='/login' element={<Login />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
