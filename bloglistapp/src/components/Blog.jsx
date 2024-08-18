import Togglable from './Togglable'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notifications'
import { likeBlog, removeBlog } from '../reducers/blogs'

const Blog = ({
  blog,
  ...props
}) => {
  const dispatch = useDispatch()
  const [likes, setLikes] = useState(blog.likes)
  const [thinking, setThinking] = useState(false)
  const user = useSelector(state => state.user)
  const username = user.username

  const sumUpLikes = async () => {
    setThinking(true)
    dispatch(likeBlog(blog))
    setLikes(likes + 1)
    dispatch(setNotification(`Liked '${blog.title}'`, { timeout: 2 }))
    setThinking(false)
  }

  return (
    <div
      data-testid='blog-item'
      style={{
        padding: '1rem',
        border: '1px solid gray',
        borderRadius: '1rem',
        marginBlock: '1rem',
      }}
      {...props}
    >
      <span className='blog__title-author' style={{ marginRight: '1ch' }}>
        <b>{blog.title}</b> {blog.author}
      </span>
      <Togglable buttonLabel='View' reverse={true}>
        <br />
        <a
          className='blog__url'
          href={blog.url}
          target='_blank'
          rel='noreferrer'
        >
          {blog.url}
        </a>
        <br />
        <span className='blog__likes' style={{ marginRight: '1ch' }}>
          Likes: {likes}
        </span>
        <button
          className='blog__likes-button'
          onClick={sumUpLikes}
          disabled={thinking}
        >
          Like
        </button>
        <br />
        {blog.user.name}
        <br />
        {username === blog.user.username ? (
          <button
            className='blog__delete'
            onClick={e => dispatch(removeBlog(blog.id))}
            style={{ marginBlock: '1rem' }}
          >
            Delete Blog
          </button>
        ) : null}
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
