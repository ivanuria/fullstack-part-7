import propTypes from 'prop-types'

const Form = ({ children, onSubmit = () => console.log('Submitting Form'), style={}, ...props }) => {
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

Form.propTypes = {
  children: propTypes.array.isRequired,
  onSubmit: propTypes.func.isRequired,
  style: propTypes.object
}

export default Form