const Label = ({ children, htmlFor, ...props }) => {
  return (
    <label htmlFor={ htmlFor } { ...props }>
      { children }
    </label>
  )
}

export default Label