import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import H2 from '../components/H2'
import { setInitialUsers } from '../reducers/users'
// MUI
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material'

const User = ({ user }) => {
  return (
    <TableRow>
      <TableCell>
        <Typography component={Link} to={`/users/${user.id}`}>
          {user.name}
        </Typography>
      </TableCell>
      <TableCell>{user.blogs.length}</TableCell>
    </TableRow>
  )
}

const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setInitialUsers())
  }, [])

  return (
    <>
      <H2>Users</H2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: 'left' }}>User</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <User key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Users
