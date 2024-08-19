import { useSelector } from 'react-redux'
import H2 from '../components/H2'
// MUI
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography
} from '@mui/material'

const User = ({ user }) => {
  return (
    <TableRow>
      <TableCell>
        <Typography
          component='a'
          href={`/users/${user.id}`}
        >{user.name}</Typography>
      </TableCell>
      <TableCell>{user.blogs.length}</TableCell>
    </TableRow>
  )
}

const Users = () => {
  const users = useSelector(state => state.users)

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
