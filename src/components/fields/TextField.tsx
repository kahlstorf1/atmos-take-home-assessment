import React, { useState } from 'react'

import { FieldDefaultProps, FieldProps } from '../../types'

type TextFieldProps = FieldProps

function TextField({ name, initialValue, onChange }: TextFieldProps) {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange(e)
  }

  return (
    <input
      type="text"
      name={name}
      className="block w-full rounded-lg border-2 border-gray-300 py-2 px-3 focus:outline-none"
      data-testId='textfield'
      value={value}
      onChange={handleChange}
    />
  )
}

TextField.defaultProps = FieldDefaultProps

export default TextField
