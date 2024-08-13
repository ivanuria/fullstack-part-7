import { useState } from 'react'
// Components
import Form from '../form/Form'
import Input from '../form/Input'

const NewAnecdote = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
  }

  return (
    <>
      <h2>Create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Input name='content' label='Content:' useThisState={() => [content, setContent]} />
        <Input name='author' label='Author:' useThisState={() => [author, setAuthor]} />
        <Input type='url' name='info' label='URL for more info:' useThisState={() => [info, setInfo]} />
        <Input type='submit' name='submit' useThisState={() => ['Create New Anecdote', () => null]} />
      </Form>
    </>
  )
}

export default NewAnecdote