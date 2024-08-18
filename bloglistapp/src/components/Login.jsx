import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import FormRow from './FormRow'
// Actions
import { login, loggedInUser } from '../reducers/user'

const Login = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams('redirect')
  const navigate = useNavigate()
  const redirect = searchParams.get('redirect')
  console.log('redirect to', redirect || '/')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const doLogin = async event => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    dispatch(login(username, password))
  }

  const user = loggedInUser()

  if (user) return navigate(redirect || '/')

  return (
    <form
      className='loginform'
      id='loginform'
      data-testid='loginform'
      onSubmit={doLogin}
    >
      <FormRow>
        <label htmlFor='username' data-testid='username-label'>
          Username:{' '}
        </label>
        <input
          id='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
          aria-label='type in your username'
          data-testid='username'
        />
      </FormRow>
      <FormRow>
        <label htmlFor='password' data-testid='password-label'>
          Password:{' '}
        </label>
        <input
          id='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          aria-label='type in your password'
          type='password'
          data-testid='password'
        />
      </FormRow>
      <input type='submit' value='Login' />
    </form>
  )
}

export default Login
