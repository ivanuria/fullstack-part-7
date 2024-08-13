import { useField } from '../../hooks'
import propTypes from 'prop-types'
// Components
import Form from '../form/Form'
import FormRow from '../form/FormRow'
import Input from '../form/Input'

const NewAnecdote = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const submit = useField('submit', 'Create new Anecdote')
  const reset = useField('reset', 'Reset all Fields', [
    content,
    author,
    info
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  return (
    <>
      <h2>Create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Input name='content' label='Content:' useThisState={() => content} />
        <Input name='author' label='Author:' useThisState={() => author} />
        <Input type='url' name='info' label='URL for more info:' useThisState={() => info} />
        <FormRow display='flex'>
          <Input name='submit' useThisState={() => submit} />
          <button { ...reset }>{ reset.value }</button>
        </FormRow>
      </Form>
    </>
  )
}

NewAnecdote.propTypes = {
  addNew: propTypes.func.isRequired
}

export default NewAnecdote