/* eslint-disable react/prop-types */
import { useState } from 'react'

const SelectWithCustomOption = ({
  label,
  name,
  options,
  handleOnChange,
  value
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customOption, setCustomOption] = useState('')

  const handleSelectChange = e => {
    const selectedValue = e.target.value
    if (selectedValue === 'custom') {
      setShowCustomInput(true)
    } else {
      setShowCustomInput(false)
      handleOnChange(e)
    }
  }

  const handleCustomInputChange = e => {
    setCustomOption(e.target.value)
  }

  const handleAddCustomOption = () => {
    handleOnChange({ target: { name, value: customOption } })
    setShowCustomInput(false)
    setCustomOption('')
  }

  return (
    <div className='flex flex-col h-24'>
      <label htmlFor={name}>{label}</label>
      <select
        className='p-1 rounded-lg shadow-md'
        id={name}
        name={name}
        onChange={handleSelectChange}
        value={value}
        required
      >
        <option value=''>Select {name}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
        <option value='custom'>Add new option</option>
      </select>

      <div className='flex items-center h-full '>
        {showCustomInput && (
          <div className='mt-2'>
            <input
              className='p-1 rounded-lg shadow-md'
              type='text'
              value={customOption}
              onChange={handleCustomInputChange}
              placeholder={'Type new option'}
            />
            <button
              className='bg-blue-200 border border-blue-300 py-1 px-2 rounded-lg ml-2 shadow-md'
              onClick={handleAddCustomOption}
            >
              Agregar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectWithCustomOption
