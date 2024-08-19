import { useSelector } from 'react-redux'
import { useMatch, useLocation, useNavigate } from 'react-router-dom'
import BlogElement from '../components/Blog'
import { loggedInUser } from '../reducers/user'

const Blog = () => {
  const user = loggedInUser()
  const navigate = useNavigate()
  const location = useLocation()
  const root = location.pathname.replace(/([a-zA-Z0-9\-_]*)$/, '')
  const match = useMatch(`${root}:id`)
  const id = match.params.id
  const blog = useSelector(state => state.blogs).find(blog => blog.id === id)

  if (!user) {
    navigate(`/login?redirect=${location.pathname}`)
  }

  if (!blog) {
    return null
  }

  return <BlogElement blog={blog} />
}

export default Blog
