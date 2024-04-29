/* eslint-disable react/prop-types */

const InputUploadForm = ({
  type,
  name,
  placeholder,
  handleOnChange,
  value,
  step,
  label,
  min,
  max
}) => {
  return (
    <div className='flex flex-col'>
      <label className='block' htmlFor={name}>
        {label}
      </label>
      <input
        className='p-1 rounded-lg shadow-md'
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value ? value : ''}
        min={min ? min : ''}
        max={max ? max : ''}
        step={step ? step : ''}
        required
      />
    </div>
  )
}

export default InputUploadForm
