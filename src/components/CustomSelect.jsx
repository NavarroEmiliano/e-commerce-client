/* eslint-disable react/prop-types */

const CustomSelect = ({ label, name, options, handleOnChange, value }) => {
  const handleSelectChange = (e) => {
    handleOnChange(e)
  }

  return (
    <div className='flex flex-col'>
      <label htmlFor={name}>{label}</label>
      <select
        className='p-1 rounded-lg shadow outline-2 outline-pink-600'
        id={name}
        name={name}
        onChange={handleSelectChange}
        value={value}
        required
      >
        <option value=''>Select {name}</option>
        {options?.map((option, index) => (
          <option key={index} value={option} className='capitalize'>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CustomSelect
