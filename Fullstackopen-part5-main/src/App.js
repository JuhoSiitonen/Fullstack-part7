import { useState, useEffect } from 'react'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import ErrorMessage from './components/ErrorMessage'
import NotificationMessage from './components/NotificationMessage'
import LoginForm from './components/LoginForm'
import AddNewBlogs from './components/AddNewBlogs'
import Togglable from './components/Togglable'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'
import { addNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deletionBlog,
} from './reducers/blogReducer'
import { logInUser, isUserLogged, logout } from './reducers/userReducer'
import userService from './services/users'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState(null)

  const dispatch = useDispatch()
  const origblogs = useSelector(({ blogs }) => blogs)
  const blogs = [...origblogs]
  const user = useSelector(({ user }) => user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(isUserLogged())
  }, [])

  useEffect(() => {
    userService.getAll().then((response) => setUsers(response))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(logInUser(username, password))
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    )
  }

  const handleNewBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(
      addNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
      ),
    )
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const addNewLike = (blogObject, id) => {
    dispatch(likeBlog(blogObject, id))
    dispatch(addNotification('like added'))
  }

  const deleteBlog = (id) => {
    dispatch(deletionBlog(id))
    dispatch(addNotification('deletion succesfull'))
  }

  const match = useMatch('/users/:id')
  const userToSee = match ? users.find((n) => n.id === match.params.id) : null

  const match2 = useMatch('/blogs/:id')
  const blogToSee = match2 ? blogs.find((n) => n.id === match2.params.id) : null

  const mainPage = () => {
    return (
      <div>
        <h2>Create new</h2>
        <Togglable buttonLabel="create">
          <AddNewBlogs handleNewBlog={handleNewBlog} />
        </Togglable>
        <br></br>
        {blogs
          .sort((firstItem, secondItem) => secondItem.likes - firstItem.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <NotificationMessage />
        <ErrorMessage />
        <h2>Log in to application</h2>
        {!user && loginForm()}
      </div>
    )
  }

  return (
    <div>
      <p>
        <Link to="/users">Users</Link>
        <> </>
        <Link to="/">Blogs</Link>
        <> </>
        {user.username} is logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <h2>Blog App</h2>
      <NotificationMessage />
      <ErrorMessage />
      <br></br>
      <Routes>
        <Route path="/" element={mainPage()} />
        <Route path="/users" element={<Users users={users} />} />
        <Route
          path="/users/:id"
          element={<SingleUser userToSee={userToSee} />}
        />
        <Route
          path="/blogs/:id"
          element={
            <SingleBlog
              blogToSee={blogToSee}
              addNewLike={addNewLike}
              deleteBlog={deleteBlog}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
