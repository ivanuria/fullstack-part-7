import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteNotification } from '../reducers/notifications'

const Notification = ({ message, level = 'info', onClick = () => null }) => {
  let style = {
    display: 'none',
    padding: '1rem',
    marginBlock: '1rem',
    width: 'fit-content',
    border: '1px solid currentcolor',
    color: 'black',
    borderRadius: '.5rem',
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
      onClick={onClick}
    >
      {message}
    </div>
  )
}

const Notifications = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(state => state.notifications)
  console.log('Notifications', notifications)
  return (
    <div className='notifications'>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          {...notification}
          onClick={() => dispatch(deleteNotification(notification.id))}
        />
      ))}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  level: PropTypes.string,
  onClick: PropTypes.func,
}

export default Notifications
