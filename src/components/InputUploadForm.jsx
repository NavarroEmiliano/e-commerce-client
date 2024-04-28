/* eslint-disable react/prop-types */

const InputUploadForm = ({
  type,
  name,
  placeholder,
  handleOnChange,
  value,
  htmlFor,
  step,
  label,
  min,
  max
}) => {
  return (
    <div className="flex flex-col" >
      <label className="block" htmlFor={htmlFor}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        min={min ? min : false}
        max={max ? max : false}
        step={step ? step : false}
      />
    </div>
  )
}

export default InputUploadForm
