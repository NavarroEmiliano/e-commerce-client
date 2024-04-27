/* eslint-disable react/no-unescaped-entities */
import {  useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

import loginService from '../services/loginService'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { initializeUserDetails } from '../features/userSlice'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()



  const handleShowPassword = () => {
    setShowPassword(prev => !prev)
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

  const handleSubmit = async e => {
    e.preventDefault()

    const userForLogin = {
      email: data.email,
      password: data.password
    }

    const response = await loginService.loginUser(userForLogin)

    if (response.status === 'OK') {
      navigate('/')
      dispatch(initializeUserDetails())
      return toast.success('Login successfully')
    } else {
      return toast.error(response.data)
    }
  }

  return (
    <section id='login' className='flex items-center min-h-[calc(100vh-120px)]'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 max-w-md mx-auto '>
          <div className='flex justify-center text-8xl text-red-600 mx-auto '>
            <FaRegUserCircle />
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <div className='grid'>
              <label>Email: </label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  placeholder='Enter email'
                  required
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
                  required
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

            <Link
              to={'/forgot-password'}
              className='block w-fit ml-auto hover:underline hover:text-red-600'
            >
              Forgot password?
            </Link>

            <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:bg-red-700 active:scale-95 duration-100 mx-auto mt-4 block'>
              Login
            </button>
          </form>
          <p className='my-5'>
            Don't have account?{' '}
            <Link
              to={'/sign-up'}
              className='font-medium 
            text-red-600
            hover:text-red-700
            hover:underline'
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
