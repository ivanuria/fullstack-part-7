import { useState } from 'react'
import { useSelector } from 'react-redux'
import { loggedInUser } from '../reducers/user.js'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// Actions
import { logout } from '../reducers/user.js'
import { setNotification } from '../reducers/notifications.js'
//MUI
import {
  Avatar,
  Button,
  Menu,
  MenuItem
} from '@mui/material'

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const UserAvatar = () => {
  const [anchorEl, setAnchorEl] = useState()
  const dispatch = useDispatch()
  const loggedUser = loggedInUser()
  const users = useSelector(state => state.users)
  const user = loggedUser && users.find(user => user.username === loggedUser.username)
  console.log(user)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setNotification('Correctly Logged Out', {level: 'success'} ))
    setAnchorEl(null)
  }

  if (!user) {
    return (
      <Button
        variant="outlined"
        disableElevation={true}
        component={Link}
        to='/login'
        sx={{
          color: 'primary.contrastText',
          borderColor: 'currentcolor',
          '&:hover': {
            bgcolor: 'primary.light',
            borderColor: 'currentcolor'
          }
        }}
      >Login</Button>
    )
  }
  return (
    <>
    <Avatar
      {...stringAvatar(user.name)}
      onClick={(e) => setAnchorEl(e.currentTarget)}
    />
    <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
      <MenuItem component={Link} to={`/users/${user.id}`} onClick={() => setAnchorEl(null)}>Details</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
    </>
  )
}

export default UserAvatar