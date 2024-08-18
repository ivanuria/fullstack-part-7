import { useSelector } from "react-redux"

const User = ({ user }) => {
  return (
    <tr>
      <td>
        <a href={`/users/${user.id}`}>{ user.name }</a>
      </td>
      <td>
        { user.blogs.length }
      </td>
    </tr>
  )
}

const Users = () => {
  const users = useSelector(state => state.users)

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