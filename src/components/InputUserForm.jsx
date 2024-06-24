/* eslint-disable react/prop-types */

import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const InputUserForm = ({ label, type, name, value, onChange, required }) => {
  const [showPassword, setShowPassword] = useState(false)
  
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div>
      <label className='font-medium'>{label}</label>
      <div className="relative">
        <input
          type={type === 'password' ? (showPassword) ? 'text' : 'password' : {type}}
          name={name}
          value={value}
          onChange={onChange}
          required={required ?? false}
          className='w-full border border-pink-400 h-12 rounded-lg mb-6 pl-2 outline-2 outline-pink-700 font-bold'
        />
        {type === 'password' && (
          <div
            onClick={handleShowPassword}
            className='absolute right-3 top-4 z-10 text-lg hover:scale-125 duration-100'
          >
            <span className="cursor-pointer">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default InputUserForm
