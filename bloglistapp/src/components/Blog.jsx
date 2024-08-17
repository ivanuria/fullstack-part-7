import Togglable from './Togglable'
import { useState } from 'react'
import PropTypes from 'prop-types'

import { useLoginValue } from '../contexts/LoginContext'

const Blog = ({ blog, updateBlog, deleteBlog, ...props }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [thinking, setThinking] = useState(false)
  const user = useLoginValue()

  const sumUpLikes = () => {
    console.log('sumUpLikes')
    setThinking(true)
    updateBlog({ ...blog, likes: likes + 1, user: blog.user.id })
    setLikes(likes + 1)
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
        {user.username === blog.user.username ? (
          <button
            className='blog__delete'
            onClick={e => deleteBlog(blog.id)}
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
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
