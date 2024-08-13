import { useState } from 'react'
import FormRow from "./FormRow"
import Label from "./Label"
import propTypes from 'prop-types'

const Input = ({ name, label, useThisState=useState, type='text', ...props }) => {
  const [value, setValue] = useThisState()
  return (
    <FormRow { ...props } >
      { label && <Label htmlFor={ name }>{ label }</Label> }
      <input value={ value } onChange={ (event) => setValue(event.target.value) } type={ type } name={ name } id={ name } />
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