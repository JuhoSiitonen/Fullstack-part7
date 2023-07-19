import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  if (users === null) {
    return <></>
  }
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
            {user.blogs.length}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
