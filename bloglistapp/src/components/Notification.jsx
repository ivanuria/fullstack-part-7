import { useSelector, useDispatch } from 'react-redux'
import { deleteNotification } from '../reducers/notifications'

import { Container, Alert } from '@mui/material'

const Notifications = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(state => state.notifications)
  const style = {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem'
  }
  console.log('Notifications', notifications)
  return (
    <div className='notifications' style={style}>
      <Container>
        {notifications.map(notification => (
          <Alert
            key={notification.id}
            severity={notification.level}
            onClose={() => dispatch(deleteNotification(notification.id))}
          >
            {notification.message}
          </Alert>
        ))}
      </Container>
    </div>
  )
}

export default Notifications
