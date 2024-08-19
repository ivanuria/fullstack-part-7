import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  Menu,
  MenuItem,
  MenuList
} from '@mui/material'

const MainMenuItem = ({ navItem }) => {
  const [anchorEl, setAnchorEl] = useState()

  if (navItem.to) {
    return (
      <MenuItem
        component={ Link }
        color='inherit'
        to={navItem.to}
        sx={{
          fontWeight: '700'
        }}
      >
        {navItem.text}
      </MenuItem>
    )
  }
  if (navItem.submenu) {
    return (
      <>
      <MenuItem
        sx={{
          fontWeight: '700'
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {navItem.text}
      </MenuItem>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {navItem.submenu.map(navItem =>
          <MainMenuItem key={navItem.to} navItem={navItem} />
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
      <MenuList
        component='menu'
        sx={{
          paddingInlineStart: '2ch',
          display: 'flex',
          listStyleType: 'none'
        }}
      >
        {navItems.map(navItem =>
          <MainMenuItem key={navItem.text} navItem={navItem} />
        )}
      </MenuList>
    </Box>
  )
}

export default MainMenu