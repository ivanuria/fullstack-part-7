import { Link } from 'react-router-dom'
//MUI
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Container,
  Toolbar,
  Typography,
} from '@mui/material'
import {
  Menu as MenuIcon
} from '@mui/icons-material'

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
          <Button
            variant='text'
            color='inherit'
            disableGutters={true}
            sx={{
              minWidth: 'fit-content',
              px: 0,
              display: {
                sm: 'flex',
                md: 'none'
              }
            }}
          >
            <MenuIcon
              sx={{
                width: 40,
                height: 40
              }}
            />
          </Button>
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
                  color: 'inherit',
                  textDecoration: 'none',
                  fontWeight: '700',
                  marginInline: 0,
                  fontSize: {
                    xs: 22,
                    md: 40
                  }
                }}
              >
                BlogApp
              </Typography>
            </Typography>
            <MainMenu
              navItems={navItems}
              sx={{
                display: {
                  sm: 'none',
                  md: 'flex'
                }
              }}
            />
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