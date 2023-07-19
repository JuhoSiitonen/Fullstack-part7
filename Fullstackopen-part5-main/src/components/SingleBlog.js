import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import commentsService from '../services/comments'

const SingleBlog = ({ blogToSee, addNewLike, deleteBlog }) => {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const user = useSelector(({ user }) => user)
  const owner = blogToSee.user.username === user.username ? true : false
  console.log(blogToSee)
  console.log(user.username)

  useEffect(() => {
    commentsService
      .getAllComments(blogToSee.id)
      .then((response) => setComments(response))
  }, [])

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

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const newComment = async (event) => {
    event.preventDefault()
    const commentToSave = {
      content: comment,
    }
    const returnedComment = await commentsService.create(
      blogToSee.id,
      commentToSave,
    )
    setComments(comments.concat(returnedComment))
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
      {blogToSee.likes} likes <button onClick={handleLikes}>like</button>
      <p>added by {blogToSee.user.username}</p>
      {owner && deleteButton()}
      <br></br>
      <h3>Comments</h3>
      <form onSubmit={newComment}>
        <div>
          <input
            value={comment}
            name="Comment"
            onChange={handleCommentChange}
          />
          <button type="submit">add comment</button>
        </div>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default SingleBlog
