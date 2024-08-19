import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import FormRow from '../components/FormRow'
// Actions
import { login, loggedInUser } from '../reducers/user'

import {
  Button,
  FormGroup,
  TextField,
  Paper,
} from '@mui/material'

import H2 from '../components/H2'

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
    <>
    <H2>Login</H2>
    <Paper
      sx={{
        maxWidth: 400,
        marginInline: 'auto'
      }}
    >
      <form
        className='loginform'
        id='loginform'
        data-testid='loginform'
        onSubmit={doLogin}
      >
        <FormGroup
          sx={{
            gap: 2,
            p: '1rem'
          }}
        >
          <TextField
            label='Username'
            id='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
            aria-label='type in your username'
            data-testid='username'
          />
          <TextField
            label='Password'
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            aria-label='type in your password'
            type='password'
            data-testid='password'
          />
          <Button type='submit' variant='contained' size='large'>Login</Button>
        </FormGroup>
      </form>
    </Paper>
    </>
  )
}

export default Login
