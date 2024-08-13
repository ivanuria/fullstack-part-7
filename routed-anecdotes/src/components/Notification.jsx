const Notification = ({ notification }) => {
  const style = {
    padding: '.5rem 1rem',
    border: '2px solid currentcolor',
    color: 'green',
    borderRadius: '1rem'
  }
  if (!notification || notification === '') {
    return null
  }
  return (
    <div style={ style } className='notification'>
      { notification }
    </div>
  )
}

export default Notification