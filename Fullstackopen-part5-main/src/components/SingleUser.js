const SingleUser = ({ userToSee }) => {
  console.log(userToSee)
  if (userToSee === null) {
    return <></>
  }
  return (
    <div>
      <h1>{userToSee.username}</h1>
      <h2>Added blogs:</h2>
      <ul>
        {userToSee.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default SingleUser
