import { useSelector } from 'react-redux'
import { useMatch, useLocation } from 'react-router-dom'

const User = () => {
  const location = useLocation()
  const root = location.pathname.replace(/([a-zA-Z0-9\-_]*)$/, '')
  const match = useMatch(`${root}:id`)
  const id = match.params.id
  const user = useSelector(state => state.users).find(user => user.id === id)

  if (!user) {
    return null
  }

  return (
    <>
      <h1>{user.name}</h1>
      <ul>
        {user.blogs.map(blog => (
          <li>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
