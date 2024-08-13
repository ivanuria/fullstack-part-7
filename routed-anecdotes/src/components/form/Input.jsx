import FormRow from "./FormRow"
import Label from "./Label"
import propTypes from 'prop-types'
import { useField } from '../../hooks'

const Input = ({ name, label, useThisState=useField, type='text', ...props }) => {
  const input = useThisState(type)
  const inputCopy = {...input}
  delete inputCopy.setValue
  return (
    <FormRow { ...props } >
      { label && <Label htmlFor={ name }>{ label }</Label> }
      <input { ...inputCopy } name={ name } id={ name } />
    </FormRow>
  )
}

Input.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string,
  useThisState: propTypes.func,
  type: propTypes.string
}

export default Input