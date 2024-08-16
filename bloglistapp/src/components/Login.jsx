import { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import FormRow from './FormRow'
import PropTypes from 'prop-types'
// Actions
import { setNotification } from '../reducers/notifications'

const Login = ({ setUser }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const doLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('bau', JSON.stringify(user))
      setUser(user)
      dispatch(setNotification('Correctly Logged In'))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(
        setNotification('Invalid username and password', { level: 'error' }),
      )
    }
  }

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

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
}

export default Login
