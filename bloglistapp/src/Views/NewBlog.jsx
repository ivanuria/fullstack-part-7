import { useState } from 'react'
import FormRow from '../components/FormRow'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createNewBlog } from '../reducers/blogs'
import { setNotification } from '../reducers/notifications'
//MUI
import {
  Box,
  Button,
  Paper,
  FormGroup,
  TextField
} from '@mui/material'
import H2 from '../components/H2'

const NewBlog = ({ ...props }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const user = useSelector(state => state.user)

  const addNewBlog = async event => {
    console.log('AddNewBlog')
    event.preventDefault()
    if (title && author && url) {
      dispatch(
        createNewBlog({
          title,
          author,
          url,
          user,
        }),
      )
      dispatch(setNotification(`'${title}' correctly added`, { level: 'success' }))
      setTitle('')
      setAuthor('')
      setUrl('')
    }
    navigate('/blogs')
  }

  return (
    <div
      className='new-blog'
      style={{ marginBlock: '1rem' }}
      data-testid='new-blog'
      {...props}
    >
      <H2>Create new Blog</H2>
      <Paper
        sx={{
          p: '1rem',
          maxWidth: 800,
          marginInline: 'auto'
        }}
      >
      <form
        className='new-blog__form'
        id='new-blog'
        onSubmit={addNewBlog}
        data-testid='new-blog-form'
      >
        <FormGroup
          sx={{
            gap: 2
          }}
        >
          <TextField
            label='Title'
            id='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            data-testid='new-blog-title'
            variant='outlined'
            required
          />
          <TextField
            label='Author'
            id='author'
            value={author}
            onChange={e => setAuthor(e.target.value)}
            data-testid='new-blog-author'
            required
          />
          <TextField
            label='Url'
            id='url'
            value={url}
            onChange={e => setUrl(e.target.value)}
            type='url'
            data-testid='new-blog-url'
            required
          />
          <Button variant='contained' color='secondary' type='submit'>Create new</Button>
          </FormGroup>
        </form>
      </Paper>
    </div>
  )
}

export default NewBlog
