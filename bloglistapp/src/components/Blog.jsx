import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notifications'
import { likeBlog, removeBlog } from '../reducers/blogs'

const Blog = ({ blog, ...props }) => {
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

  console.log(blog)

  return (
    <div
      data-testid='blog-item'
      {...props}
    >
      <h1 className='blog__title-author'>
        <b>{blog.title}</b> {blog.author}
      </h1>
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
        <span className='blog__likes'>
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
        <div>
          <ul>
            {blog.comments.map(comment =>
              <li key={comment.id}>{ comment.content }</li>
            )}
          </ul>
        </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
