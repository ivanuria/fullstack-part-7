import { Link } from 'react-router-dom'
//MUI
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography
} from '@mui/material'

import MainMenu from './MainMenu.jsx'
import UserAvatar from './UserAvatar.jsx'

const Header = () => {
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
        <Toolbar
          disableGutters={true}
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
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
          </Box>
          <Box>
            <UserAvatar />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

  )
}

export default Header