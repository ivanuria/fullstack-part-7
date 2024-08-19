import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  Typography
} from '@mui/material'
import {
  Menu as MenuIcon
} from '@mui/icons-material'

const MenuItem = ({ navItem }) => {
  console.log(navItem)
  if (navItem.submenu) {
    console.log(navItem.submenu)
    return (
      <>
      {navItem.submenu.map(submenu => <MenuItem key={`${navItem}/${submenu.text}`} navItem={submenu} />)}
      </>
    )
  }
  return (<ListItemButton
    sx={{
      width: '100%'
    }}
    key={navItem.text}
    component={Link}
    to={navItem.to}
  >{navItem.text}</ListItemButton>)
}

const MobileMenu = ({ navItems }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
    <Button
      variant='text'
      color='inherit'
      onClick={() => setOpen(!open)}
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
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
    >
      <Box
        sx={{
          width: '250px'
        }}
        role='presentation'
        onClick={() => setOpen(false)}>
          <Box
            sx={{
              p: '1rem'
            }}
          >
          <Typography
            variant='h1'
            color= 'primary'
            sx={{
              fontSize: 22
            }}
          >BlogApp</Typography>
          </Box>
          <List
            sx={{
              width: '100%'
            }}
          >
          {
            navItems.map(navItem => (
              <MenuItem key={navItem.text} navItem={navItem} />
            ))
          }

          </List>
        </Box>
    </Drawer>
    </>
  )
}

export default MobileMenu