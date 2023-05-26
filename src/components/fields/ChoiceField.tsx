import React, { useState } from 'react'
import { nanoid } from 'nanoid'

import { FieldProps, FieldDefaultProps } from '../../types'
import { classNames } from '../../utils'

interface ChoiceFieldProps extends FieldProps {
  choices: string[];
}

function ChoiceField({
  name, initialValue, choices, onChange,
}: ChoiceFieldProps) {
  const [value, setValue] = useState(initialValue)

  return (
    <div className="grid grid-cols-4 items-stretch gap-5">
      { choices.map((choice) => (
        <button
          type="button"
          data-testId='choicefield'
          name={name}
          key={nanoid()}
          className={classNames(
            'inline-block rounded-lg border-2 bg-white p-5 text-center font-semibold text-gray-800 transition-colors',
            choice === value ? 'border-primary-600 bg-primary-50' : 'border-gray-300',
          )}
          onClick={() => {
            if (value === choice) {
              setValue('')
              onChange({ target: { name, value: '' } } as React.ChangeEvent<HTMLInputElement>)
            } else {
              setValue(choice)
              onChange({ target: { name, value: choice } } as React.ChangeEvent<HTMLInputElement>)
            }
          }}
        >
          { choice }
        </button>
      )) }
    </div>
  )
}

ChoiceField.defaultProps = FieldDefaultProps

export default ChoiceField
