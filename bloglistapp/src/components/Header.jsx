import { loggedInUser } from '../reducers/user.js'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// Actions
import { logout } from '../reducers/user.js'
import { setNotification } from '../reducers/notifications.js'
//MUI
import {
  AppBar,
  Box,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material'

import MainMenu from './MainMenu.jsx'

const Header = () => {
  const user = loggedInUser()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setNotification('Correctly Logged Out', {level: 'success'} ))
  }

  const navItems = [
    {
      to: '/',
      text: 'Home'
    },
    {
      text: 'Blogs',
      submenu: [
        {
          to: '/blogs',
          text: 'Blogs'
        },
        {
          to: '/blogs/new',
          text: 'Add New Blog'
        }
      ]
    },
    {
      to: '/users',
      text: 'Users'
    }
  ]

  return (
    <AppBar position='sticky'>
      <Container>
        <Toolbar disableGutters={true}>
          <Typography
            component='h1'
          >
            <Typography
              component={Link}
              variant='h1'
              to='/'
              sx={{
                display: { xs: 'none', md: 'flex' },
                color: 'inherit',
                textDecoration: 'none',
                fontWeight: '700',
                marginInline: 0,
                fontSize: 40
              }}
            >
              BlogApp
            </Typography>
          </Typography>
          <MainMenu navItems={navItems} />
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
        </Toolbar>
      </Container>
    </AppBar>

  )
}

export default Header