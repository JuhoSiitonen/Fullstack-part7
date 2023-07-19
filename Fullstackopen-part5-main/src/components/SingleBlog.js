import { useSelector } from 'react-redux'

const SingleBlog = ({ blogToSee, addNewLike, deleteBlog }) => {
  const user = useSelector(({ user }) => user)
  const owner = blogToSee.user.username === user.username ? true : false
  console.log(blogToSee)
  console.log(user.username)

  const handleLikes = () => {
    const newLikes = blogToSee.likes + 1
    const blogObject = {
      user: blogToSee.user.id,
      likes: newLikes,
      author: blogToSee.author,
      title: blogToSee.title,
      url: blogToSee.url,
    }
    addNewLike(blogObject, blogToSee.id)
  }

  const handleDeletion = () => {
    if (!window.confirm(`Remove ${blogToSee.title} by ${blogToSee.author}?`)) {
      return
    }
    deleteBlog(blogToSee.id)
  }

  const deleteButton = () => {
    return (
      <button onClick={handleDeletion} id="removebutton">
        remove
      </button>
    )
  }

  if (blogToSee === null) {
    return <></>
  }
  return (
    <div>
      <h1>{blogToSee.title}</h1>
      <p>
        <a href={blogToSee.url}>{blogToSee.url}</a>
      </p>
      {blogToSee.likes} <button onClick={handleLikes}>like</button>
      <p>added by {blogToSee.user.username}</p>
      {owner && deleteButton()}
    </div>
  )
}

export default SingleBlog
