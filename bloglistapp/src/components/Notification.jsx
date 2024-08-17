import {
  useNotificationsValue,
  useNotificationsDispatch,
  actions,
} from '../contexts/NotificationsContext'
import PropTypes from 'prop-types'

const Notification = ({ id, message, level }) => {
  const notificationDispatch = useNotificationsDispatch()
  const handleClick = () => {
    notificationDispatch(actions.deleteNotification(id))
  }
  let style = {
    display: 'none',
    padding: '1rem',
    marginBlock: '1rem',
    width: 'fit-content',
    border: '1px solid currentcolor',
    color: 'black',
    borderRadius: '.5rem',
    cursor: 'pointer',
  }

  if (level === 'info' && message !== '') {
    style = {
      ...style,
      display: 'block',
      color: 'green',
    }
  }

  if (level === 'alert' && message !== '') {
    style = {
      ...style,
      display: 'block',
      color: 'orange',
    }
  }

  if (level === 'error' && message !== '') {
    style = {
      ...style,
      display: 'block',
      color: 'red',
    }
  }

  return (
    <div
      className='notification'
      data-level={level}
      style={style}
      onClick={handleClick}
    >
      {message}
    </div>
  )
}

const Notifications = () => {
  const notifications = useNotificationsValue()

  return (
    <div className='notifications'>
      {notifications.map(notification => (
        <Notification key={notification.id} {...notification} />
      ))}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  level: PropTypes.string.isRequired,
}

export default Notifications
