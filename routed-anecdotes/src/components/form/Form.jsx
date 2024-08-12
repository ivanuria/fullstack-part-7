const Form = ({ children, onSubmit = event => console.log('Submitting Form'), style={}, ...props }) => {
  const thisStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: '.5rem',
    ...style
  }
  const onThisSubmit = event => {
    event.preventDefault()
    onSubmit(event)
  }
  return (
    <form { ...props } onSubmit={ onThisSubmit } style={thisStyle}>
      { children }
    </form>
  )
}

export default Form