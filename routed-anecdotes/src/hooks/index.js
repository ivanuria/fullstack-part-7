import { useState } from 'react'

export const useField = (type, defaultValue='', hooks=[]) => {
  const [value, setValue] = useState(defaultValue)

  const onChange = event => {
    setValue(event.target.value)
  }

  let onClick = () => null

  if (type === 'reset') {
    onClick = () => {
      for (const hook of hooks) {
        hook.setValue('')
      }
    }
  }

  return {
    type,
    value,
    setValue,
    onChange,
    onClick
  }
}