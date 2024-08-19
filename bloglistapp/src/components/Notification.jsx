import { useSelector, useDispatch } from 'react-redux'
import { deleteNotification } from '../reducers/notifications'

import { Box, Alert } from '@mui/material'

const Notifications = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(state => state.notifications)
  const style = {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
  }
  console.log('Notifications', notifications)
  return (
    <Box
      className='notifications'
      sx={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        display: 'grid',
        gap: 1,
      }}
    >
      {notifications.map(notification => (
        <Alert
          key={notification.id}
          severity={notification.level}
          onClose={() => dispatch(deleteNotification(notification.id))}
        >
          {notification.message}
        </Alert>
      ))}
    </Box>
  )
}

export default Notifications
