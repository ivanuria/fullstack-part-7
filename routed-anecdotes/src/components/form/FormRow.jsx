import propTypes from 'prop-types'

const FormRow = ({ children, style={}, ...props }) => {
  const defaultStyle = {
    gridColumn: 'span 2',
    gap: '1ch',
    display: 'flex',
    justifyContent: 'center',
    ...style
  }
  if (children.filter(child => child).length === 2) {
    defaultStyle.display = 'grid'
    defaultStyle.gridTemplateColumns = 'subgrid'
  }
  return (
    <div style={ defaultStyle } { ...props }>{ children }</div>
  )
}

FormRow.propTypes = {
  children: propTypes.array.isRequired,
  style: propTypes.object
}

export default FormRow