import { useSelector } from 'react-redux'
import { useMatch, useLocation, useNavigate } from 'react-router-dom'
import { loggedInUser } from '../reducers/user'

const User = () => {
  const navigate = useNavigate()
  const loggedUser = loggedInUser()
  const location = useLocation()
  const root = location.pathname.replace(/([a-zA-Z0-9\-_]*)$/, '')
  const match = useMatch(`${root}:id`)
  const id = match.params.id
  const user = useSelector(state => state.users).find(user => user.id === id)

  if (!user) {
    return null
  }

  if (!loggedUser) {
    navigate(`/login?redirect=${location.pathname}`)
  }

  return (
    <>
      <h1>{user.name}</h1>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}><a href={`/blogs/${blog.id}`}>{blog.title}</a></li>
        ))}
      </ul>
    </>
  )
}

export default User
