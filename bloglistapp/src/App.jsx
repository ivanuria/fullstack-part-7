import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
    dispatch(createNewBlog(newBlog, user))
    dispatch(setNotification(`'${newBlog.title}' correctly added`))
    newBlogRef.current.toggleVisible()
  }

  blogs.sort((a, b) => a.likes - b.likes)
  if (sorted === 'higherFirst') {
    blogs.reverse()
  }

  const handleSortBlogs = () => {
    setSorted(sorted === 'higherFirst' ? 'lowerFirst' : 'higherFirst')
  }

  const checkLogin = () => {
    if (user) {
      return (
        <>
          <p>
            <b>{user.name}</b> logged in{' '}
            <button style={{ marginLeft: '1ch' }} onClick={handleLogout}>
              Logout
            </button>
          </p>
          <Togglable buttonLabel='Add New Blog' ref={newBlogRef}>
            <NewBlog addToBlogs={addToblogs} />
          </Togglable>
          <br />
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
    return <Login />
  }

  return (
    <div>
      <h2>Blogs app</h2>
      <Notifications />
      {checkLogin()}
    </div>
  )
}

export default App
