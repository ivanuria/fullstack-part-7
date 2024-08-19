import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  Menu,
  MenuList,
  MenuItem,
  ButtonGroup
} from '@mui/material'

const MainMenuItem = ({ navItem }) => {
  const [anchorEl, setAnchorEl] = useState()

  if (navItem.to) {
    return (
      <Button
        component={Link}
        color='inherit'
        to={navItem.to}
        sx={{
          fontWeight: '700',
          textTransform: 'unset'
        }}
      >
        {navItem.text}
      </Button>
    )
  }
  if (navItem.submenu) {
    return (
      <>
      <Button
        color='inherit'
        sx={{
          fontWeight: '700',
          textTransform: 'unset'
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {navItem.text}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
      >
        {navItem.submenu.map(navItem =>
          <MenuItem
            component={Link}
            key={navItem.text}
            to={navItem.to}
          >{navItem.text}</MenuItem>
        )}
      </Menu>
      </>
    )
  }
}

const MainMenu = ({ navItems, ...props }) => {
  return (
    <Box
      component='nav'
      {...props}
    >
      <ButtonGroup
        variant='text'
        component='menu'
        sx={{
          paddingInlineStart: '2ch',
          display: 'flex',
          listStyleType: 'none',
          gap: 2
        }}
      >
        {navItems.map(navItem =>
          <MainMenuItem key={navItem.text} navItem={navItem} />
        )}
      </ButtonGroup>
    </Box>
  )
}

export default MainMenu