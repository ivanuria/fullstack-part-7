import { useSelector, useDispatch } from 'react-redux'
import { useMatch, useLocation, useNavigate, Link } from 'react-router-dom'
import { loggedInUser } from '../reducers/user'
import { setInitialUsers } from '../reducers/users'
import H2 from '../components/H2'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import { Circle as CircleIcon } from '@mui/icons-material'

const User = () => {
  const navigate = useNavigate()
  const loggedUser = loggedInUser()
  const location = useLocation()
  const root = location.pathname.replace(/([a-zA-Z0-9\-_]*)$/, '')
  const match = useMatch(`${root}:id`)
  const id = match.params.id
  const user = useSelector(state => state.users).find(user => user.id === id)

  const dispatch = useDispatch()
  dispatch(setInitialUsers())

  if (!user) {
    return null
  }

  if (!loggedUser) {
    navigate(`/login?redirect=${location.pathname}`)
  }

  return (
    <>
      <H2>{user.name}</H2>
      <List>
        {user.blogs.map(blog => (
          <ListItem key={blog.id}>
            <ListItemIcon>
              <CircleIcon color='primary' />
            </ListItemIcon>
            <ListItemText>
              <Typography component={Link} to={`/blogs/${blog.id}`}>
                {blog.title}
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default User
