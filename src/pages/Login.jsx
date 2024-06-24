/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { FaRegUserCircle} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

import loginService from '../services/loginService'
import { toast } from 'react-toastify'
import { IoMdArrowRoundBack } from 'react-icons/io'
import InputUserForm from '../components/InputUserForm'

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()


  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userForLogin = {
      email: data.email,
      password: data.password,
    }

    const response = await loginService.loginUser(userForLogin)
    if (response.status === 'OK') {
      navigate('/')
      return toast.success('Login successfully')
    } else {
      return toast.error(response.data)
    }
  }

  return (
    <section
      id='login'
      className='relative flex items-center justify-center h-screen'
    >
      <Link
        to='/'
        className='absolute text-3xl text-pink-600 pt-2 top-0 right-0'
      >
        <IoMdArrowRoundBack />
      </Link>

      <div className='w-full max-w-[430px] p-2'>
          <div className='flex flex-col items-center justify-center text-5xl text-pink-600 mb-6'>
            <h3>Login</h3>
            <div className='text-6xl mt-2'>
              <FaRegUserCircle />
            </div>
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <InputUserForm
              label='Email'
              type='email'
              name='email'
              value={data.email}
              onChange={handleOnChange}
              required={true}
            />

            <InputUserForm
              label='Password'
              type='password'
              name='password'
              value={data.password}
              onChange={handleOnChange}
              required={true}
            />

            <Link
              to={'/forgot-password'}
              className='block w-fit ml-auto hover:underline hover:text-red-600'
            >
              Forgot password?
            </Link>

            <button className='w-full p-4 rounded-lg text-white text-xl font-medium bg-pink-600 hover:bg-pink-800 active:scale-95 duration-100'>
              Login
            </button>
          </form>
          <p className='mt-4'>
            Don't have account?{' '}
            <Link to={'/sign-up'} className='font-bold text-pink-600'>
              Sign Up
            </Link>
          </p>
        </div>
    </section>
  )
}

export default Login
