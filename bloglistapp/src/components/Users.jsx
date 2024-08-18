import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { setInitialUsers } from "../reducers/users"

const User = ({ user }) => {
  return (
    <tr>
      <td>
        { user.name }
      </td>
      <td>
        { user.blogs.length }
      </td>
    </tr>
  )
}

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(setInitialUsers())
  }, [])

  return (
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <User key={user.id} user={user} />)}
        </tbody>
      </table>
    </>
  )
}

export default Users