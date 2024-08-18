import { useState } from 'react'
import FormRow from '../components/FormRow'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createNewBlog } from '../reducers/blogs'
import { setNotification } from '../reducers/notifications'

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
    dispatch(
      createNewBlog({
        title,
        author,
        url,
        user,
      }),
    )
    dispatch(setNotification(`'${title}' correctly added`))
    setTitle('')
    setAuthor('')
    setUrl('')
    navigate('/blogs')
  }

  return (
    <div
      className='new-blog'
      style={{ marginBlock: '1rem' }}
      data-testid='new-blog'
      {...props}
    >
      <h2>Create new Blog</h2>
      <form
        className='new-blog__form'
        id='new-blog'
        onSubmit={addNewBlog}
        data-testid='new-blog-form'
      >
        <FormRow>
          <label htmlFor='title'>Title: </label>
          <input
            id='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            data-testid='new-blog-title'
          />
        </FormRow>
        <FormRow>
          <label htmlFor='author'>Author: </label>
          <input
            id='author'
            value={author}
            onChange={e => setAuthor(e.target.value)}
            data-testid='new-blog-author'
          />
        </FormRow>
        <FormRow>
          <label htmlFor='url'>Url: </label>
          <input
            id='url'
            value={url}
            onChange={e => setUrl(e.target.value)}
            type='url'
            data-testid='new-blog-url'
          />
        </FormRow>
        <input type='submit' value='Create new' />
      </form>
    </div>
  )
}

export default NewBlog
