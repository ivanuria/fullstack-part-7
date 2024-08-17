import { createContext, useReducer, useContext } from 'react'
import PropTypes from 'prop-types'

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'login/checkInitialLoggedIn':
      let lsUser = window.localStorage.getItem('bau')
      if (lsUser) {
        lsUser = JSON.parse(lsUser)
        lsUser.expiresAt = new Date(lsUser.expiresAt)
        const now = new Date()
        if (lsUser.expiresAt >= now) {
          return lsUser
        } else {
          window.localStorage.removeItem('bau')
          return null
        }
      }
    case 'login/login':
      if (action.payload) {
        const user = JSON.stringify(action.payload)
        window.localStorage.setItem('bau', user)
        return action.payload
      }
      return null
    case 'login/logout':
      window.localStorage.removeItem('bau')
      return null
    default:
      return null
  }
}

export const actions = {
  checkInitialLoggedIn () {
    return {
      type: 'login/checkInitialLoggedIn'
    }
  },
  login (user) {
    return {
      type: 'login/login',
      payload: user
    }
  },
  logout () {
    return {
      type: 'login/logout'
    }
  }
}

const LoginContext = createContext()

export const useLoginValue = () => {
  const vAndD = useContext(LoginContext)
  return vAndD[0]
}

export const useLoginDispatch = () => {
  const vAndD = useContext(LoginContext)
  return vAndD[1]
}

export const LoginContextProvider = ({ children }) => {
  const [login, loginDispatch] = useReducer(loginReducer, [])

  return (
    <LoginContext.Provider value={[login, loginDispatch]}>
      { children }
    </LoginContext.Provider>
  )
}

LoginContextProvider.propTypes = {
  children: PropTypes.any
}

export default LoginContext