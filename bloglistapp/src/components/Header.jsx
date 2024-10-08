import { Link } from 'react-router-dom'
//MUI
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material'

import MainMenu from './MainMenu.jsx'
import UserAvatar from './UserAvatar.jsx'
import MobileMenu from './MobileMenu.jsx'

const Header = () => {
  const restricted = true
  const navItems = [
    {
      to: '/',
      text: 'Home',
    },
    {
      restricted,
      text: 'Blogs',
      submenu: [
        {
          restricted,
          to: '/blogs',
          text: 'Blogs',
        },
        {
          restricted,
          to: '/blogs/new',
          text: 'Add New Blog',
        },
      ],
    },
    {
      restricted,
      to: '/users',
      text: 'Users',
    },
  ]

  return (
    <>
      <Button
        href='#main'
        variant='contained'
        color='tertiary'
        sx={{
          position: 'fixed',
          top: 8,
          left: 8,
          ':focus-visible': {
            zIndex: '9999999',
          },
        }}
      >
        Skip to content
      </Button>
      <AppBar position='sticky'>
        <Container>
          <Toolbar
            disableGutters={true}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <MobileMenu navItems={navItems} />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography component='h1'>
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
                      md: 40,
                    },
                  }}
                >
                  BlogApp
                </Typography>
              </Typography>
              <MainMenu
                navItems={navItems}
                sx={{
                  display: {
                    xs: 'none',
                    md: 'flex',
                  },
                }}
              />
            </Box>
            <Box>
              <UserAvatar />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default Header
