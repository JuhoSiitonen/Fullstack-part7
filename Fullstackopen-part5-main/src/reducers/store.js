import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blogReducer'
import notificationReducer from './notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer
  },
})

export default store
