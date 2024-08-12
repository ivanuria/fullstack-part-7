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
  } else {

  }
  return (
    <div style={ defaultStyle } { ...props }>{ children }</div>
  )
}

export default FormRow