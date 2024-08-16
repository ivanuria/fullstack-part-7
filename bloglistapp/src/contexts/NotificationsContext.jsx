import { createContext, useReducer, useContext } from 'react'
import PropTypes from 'prop-types'

const createId = () => {
  return (+new Date()).toString(36)
}

const notificationsReducer = (state, action) => {
  switch (action.type) {
    case "notifications/createNotification":
      return [
        ...state,
        action.payload
      ]
    case "notifications/deleteNotification":
      return state.filter(s => s.id.toString() !== action.payload.toString())
  }
}

export const actions = {
  createNotification(notification) {
    return {
      type: "notifications/createNotification",
      payload: notification
    }
  },
  deleteNotification(id) {
    return {
      type: "notifications/deleteNotification",
      payload: id
    }
  }
}

export const dispatchNotification = (dispatch, message, { level='info', timeout=5 } = {}) => {
  const id = createId()
  dispatch(actions.createNotification({
    id,
    message,
    level
  }))
  setTimeout(() => {
    dispatch(actions.deleteNotification(id))
  }, timeout * 1000)
}

// Custom Hooks
export const useNotificationsValue = () => {
  const vAndD = useContext(NotificationsContext)
  return vAndD[0]
}

export const useNotificationsDispatch = () => {
  const vAndD = useContext(NotificationsContext)
  return vAndD[1]
}

const NotificationsContext = createContext()

export const NotificationsContextProvider = ({ children }) => {
  const [notifications, notificationsDispatch] = useReducer(notificationsReducer, [])

  return (
    <NotificationsContext.Provider value={[notifications, notificationsDispatch]}>
      { children }
    </NotificationsContext.Provider>
  )
}

NotificationsContextProvider.propTypes = {
  children: PropTypes.any
}

export default NotificationsContext