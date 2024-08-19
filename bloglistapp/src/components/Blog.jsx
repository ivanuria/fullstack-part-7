import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notifications'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogs'

import FormRow from './FormRow'
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography
} from '@mui/material'
import H2 from './H2'

const Blog = ({ blog, ...props }) => {
  const dispatch = useDispatch()
  const [likes, setLikes] = useState(blog.likes)
  const [comment, setComment] = useState('')
  const [thinking, setThinking] = useState(false)
  const user = useSelector(state => state.user)
  const username = user.username

  const sumUpLikes = () => {
    setThinking(true)
    dispatch(likeBlog(blog))
    setLikes(likes + 1)
    dispatch(setNotification(`Liked '${blog.title}'`, { timeout: 2, level: 'success' }))
    setThinking(false)
  }

  const commentHandler = () => {
    dispatch(commentBlog(blog.id, comment))
    setComment('')
  }

  return (
    <>
      <H2>
        <b>{blog.title}</b> by {blog.author}
      </H2>
      <Box>
        <Typography
          component='a'
          href={blog.url}
          target='_blank'
          rel='noreferrer'
          sx={{
            width: 'fit-content',
            display: 'block',
            marginInline: 'auto',
            marginBlockEnd: '1rem'
          }}
        >
          {blog.url}
        </Typography>
        <Box>
          <Typography component='span'>
            Likes: {likes}
          </Typography>
          <Button
            onClick={sumUpLikes}
            disabled={thinking}
            variant='outlined'
            sx={{
              marginInlineStart: '2ch'
            }}
          >
            Like
          </Button>
        </Box>
        <Box>
        <Typography component='span'>uploaded by <b>{blog.user.name}</b></Typography>
        </Box>
        {username === blog.user.username ? (
          <Button
            onClick={e => dispatch(removeBlog(blog.id))}
            sx={{
              marginBlock: '1rem'
            }}
            variant='outlined'
          >
            Delete Blog
          </Button>
        ) : null}
        <Divider
          sx={{
            marginBlock: '1rem'
          }}
        />
        <Box>
          <Typography
            component='h3'
            variant='h6'
          >Comments:</Typography>
          <Box
            sx={{
              display: 'flex',
              marginBlockStart: '1rem',
              gap: 2
            }}
          >
            <TextField
              label='New Comment'
              id='comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') commentHandler(e) }}
              size='small'
            />
            <Button onClick={commentHandler} variant='contained' size='small'>Comment</Button>
          </Box>
          <ul>
            {blog.comments.map(comment =>
              <li key={comment.id}>{ comment.content }</li>
            )}
          </ul>
        </Box>
      </Box>
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
