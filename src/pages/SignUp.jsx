/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { IoCreateOutline } from 'react-icons/io5'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: ''
  })

  const handleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(prev => !prev)
  }

  const handleOnChange = e => {
    const { name, value } = e.target

    setData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <section id='sign-up'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 max-w-md mx-auto '>
          <div className='flex justify-center text-8xl text-red-600 mx-auto '>
            <IoCreateOutline />
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <div>
              <label>Name: </label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  name='name'
                  value={data.name}
                  onChange={handleOnChange}
                  placeholder='Enter name'
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            <div>
              <label>Email: </label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  placeholder='Enter email'
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            <div>
              <label>Password: </label>
              <div className='flex items-center bg-slate-100 p-2'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={data.password}
                  onChange={handleOnChange}
                  placeholder='Enter password'
                  className='w-full h-full outline-none bg-transparent'
                />
                <div
                  onMouseDown={handleShowPassword}
                  onMouseUp={handleShowPassword}
                  className='cursor-pointer'
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label>Confirm password: </label>
              <div className='flex items-center bg-slate-100 p-2'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  placeholder='Enter password'
                  className='w-full h-full outline-none bg-transparent'
                />
                <div
                  onMouseDown={handleShowConfirmPassword}
                  onMouseUp={handleShowConfirmPassword}
                  className='cursor-pointer'
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:bg-red-700 active:scale-95 duration-100 mx-auto mt-4 block'>
            Sign up
            </button>
          </form>
          <p className='my-5'>
            Already have account?{' '}
            <Link
              to={'/login'}
              className='font-medium 
          text-red-600
          hover:text-red-700
          hover:underline'
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default SignUp
