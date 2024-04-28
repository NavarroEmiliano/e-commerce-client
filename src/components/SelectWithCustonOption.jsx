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
    <div>
      <label>{label}</label>
      <select name={name} onChange={handleSelectChange} value={value}>
        <option value=''>Seleccionar una opción</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
        <option value='custom'>Agregar nueva opción</option>
      </select>
      {showCustomInput && (
        <div>
          <input
            type='text'
            value={customOption}
            onChange={handleCustomInputChange}
          />
          <button onClick={handleAddCustomOption}>Agregar</button>
        </div>
      )}
    </div>
  )
}

export default SelectWithCustomOption
