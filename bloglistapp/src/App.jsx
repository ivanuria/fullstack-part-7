import { useState, useEffect, useRef, useContext } from 'react'
import useRequests from './services/requests.js'
// Contexts
import NotificationsContext, {
  dispatchNotification,
} from './contexts/NotificationsContext.jsx'
import LoginContext, {
  actions as loginActions,
} from './contexts/LoginContext.jsx'
// Components
import Blogs from './components/Blogs.jsx'
import Login from './components/Login'
import NewBlog from './components/NewBlog.jsx'
import Notification from './components/Notification.jsx'
import Togglable from './components/Togglable.jsx'

const initialNotifications = [
  {
    message: 'Welcome to BlogApp',
  },
]

const App = () => {
  const [sorted, setSorted] = useState('higherFirst')
  const [createBlog, readBlog, updateBlog, deleteBlog] = useRequests(
    '/api/blogs',
    ['blogs'],
  )
  const [user, dispatchUser] = useContext(LoginContext)
  const [notification, setNotification] = useContext(NotificationsContext)
  const newBlogRef = useRef()

  console.log('Notification', notification)

  useEffect(() => {
    dispatchUser(loginActions.checkInitialLoggedIn())
    for (const notification of initialNotifications) {
      dispatchNotification(setNotification, notification.message)
    }
  }, [])

  const logout = () => {
    dispatchUser(loginActions.logout())
    dispatchNotification(setNotification, 'Correctly Logged Out')
  }

  const addToblogs = async newBlog => {
    await createBlog(newBlog)
    newBlogRef.current.toggleVisible()
    dispatchNotification(setNotification, `'${newBlog.title}' correctly added`)
  }

  const checkLogin = () => {
    if (user) {
      return (
        <>
          <p>
            <b>{user.name}</b> logged in{' '}
            <button style={{ marginLeft: '1ch' }} onClick={logout}>
              Logout
            </button>
          </p>
          <Togglable buttonLabel='Add New Blog' ref={newBlogRef}>
            <NewBlog addToBlogs={addToblogs} />
          </Togglable>
          <br />
          <button
            onClick={e =>
              setSorted(sorted === 'higherFirst' ? 'lowerFirst' : 'higherFirst')
            }
          >
            Sort Blogs{' '}
            {sorted === 'higherFirst'
              ? 'from lowest to highest'
              : 'from highest to lowest'}
          </button>
          <Blogs sorted={sorted} />
        </>
      )
    }
    return <Login />
  }

  return (
    <div>
      <h2>Blogs app</h2>
      <Notification message={notification.message} level={notification.level} />
      {checkLogin()}
    </div>
  )
}

export default App
