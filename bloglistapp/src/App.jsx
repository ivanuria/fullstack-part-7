import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog.jsx'
import blogService from './services/blogs'
import Notification from './components/Notification.jsx'
import Togglable from './components/Togglable.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()
  const [notification, setNotification] = useState({
    message: '',
    level: 'info',
  })
  const newBlogRef = useRef()
  const sorted = useRef(false)

  console.log('Notification', notification)

  useEffect(() => {
    let lsUser = window.localStorage.getItem('bau')
    if (lsUser) {
      lsUser = JSON.parse(lsUser)
      lsUser.expiresAt = new Date(lsUser.expiresAt)
      const now = new Date()
      if (lsUser.expiresAt >= now) {
        setUser(JSON.parse(lsUser))
      } else {
        window.localStorage.removeItem('bau')
      }
    }
  }, [])

  useEffect(() => {
    if (!user) return
    const getBlogs = async () => {
      let blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getBlogs()
  }, [user])

  const logout = () => {
    window.localStorage.removeItem('bau')
    setNotification({
      message: 'Correctly Logged Out',
      level: 'info',
    })
    setUser(null)
  }

  const addToblogs = async newBlog => {
    const savedBlog = await blogService.newBlog(newBlog, user)
    newBlogRef.current.toggleVisible()
    setBlogs([...blogs, { ...savedBlog, user }])
    setNotification({
      message: `'${savedBlog.title}' correctly added`,
      level: 'info',
    })
  }

  const sortBlogs = toSortBlogs => {
    let sortBlogs
    if (toSortBlogs) {
      sortBlogs = [...toSortBlogs]
    } else {
      sortBlogs = [...blogs]
    }
    sortBlogs.sort((a, b) => a.likes - b.likes)
    if (!sorted.current || sorted.current === 'lowerFirst') {
      sorted.current = 'higherFirst'
      sortBlogs.reverse()
    } else {
      sorted.current = 'lowerFirst'
    }
    setBlogs(sortBlogs)
  }

  const updateBlog = async (id, blog) => {
    blogService.updateBlog(id, blog)
    let updatedBlogs = [...blogs]
    updatedBlogs = updatedBlogs.map(b => (b.id === id ? blog : b))
    if (sorted.current) {
      sorted.current =
        sorted.current === 'lowerFirst' ? 'higherFirst' : 'lowerFirst'
      sortBlogs(updatedBlogs)
    } else {
      setBlogs(updatedBlogs)
    }
  }

  const deleteBlog = async id => {
    const toDelete = blogs.find(blog => blog.id === id)
    if (
      window.confirm(`Remove blog '${toDelete.title}' by '${toDelete.author}'`)
    ) {
      await blogService.deleteBlog(id, user)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
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
            <NewBlog addToBlogs={addToblogs} user={user} />
          </Togglable>
          <br />
          <button onClick={e => sortBlogs()}>
            Sort Blogs{' '}
            {sorted.current === 'higherFirst'
              ? 'from lowest to highest'
              : 'from highest to lowest'}
          </button>
          {blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              username={user.username}
            />
          ))}
        </>
      )
    }
    return <Login setUser={setUser} setNotification={setNotification} />
  }

  return (
    <div>
      <h2>Blogs app</h2>
      <Notification
        message={notification.message}
        level={notification.level}
        setNotification={setNotification}
      />
      {checkLogin()}
    </div>
  )
}

export default App
