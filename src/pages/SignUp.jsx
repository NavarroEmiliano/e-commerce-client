/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { IoCreateOutline } from 'react-icons/io5'

import { toast } from 'react-toastify'
import { useSignup } from '../hooks/useSignup'
import { isStrongPassword } from '../utils/isStrongPassword'
import { useAuthContext } from '../hooks/useAuthContext'
import { IoMdArrowRoundBack } from 'react-icons/io'
import InputUserForm from '../components/InputUserForm'

const SignUp = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { signup } = useSignup()

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

    try {
      const passwordStrength = isStrongPassword(data.password)
      if (passwordStrength !== true) {
        return toast.error(passwordStrength)
      }

      if (data.password !== data.confirmPassword) {
        return toast.error('Please check password and confirm password')
      }

      const userForSignUp = {
        name: data.name,
        email: data.email,
        password: data.password,
      }

      const response = await signup(userForSignUp)

      toast.success(response)
    } catch (error) {
      toast.error(error.response.data.data)
    }
  }

  useEffect(() => {
    if (user?.name) navigate('/')
  }, [user])

  return (
    <section
      id='sign-up'
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
          <h3>Sign up</h3>
          <div className='text-6xl'>
            <IoCreateOutline />
          </div>
        </div>

        <form onSubmit={handleSubmit} className='w-full'>
          <InputUserForm
            label='Name'
            type='text'
            name='name'
            value={data.name}
            onChange={handleOnChange}
            required={true}
          />
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
           <InputUserForm
            label='Confirm password'
            type='password'
            name='confirmPassword'
            value={data.confirmPassword}
            onChange={handleOnChange}
            required={true}
          />

          <button className='w-full p-4 rounded-lg text-white text-xl font-medium bg-pink-600 hover:bg-pink-800 active:scale-95 duration-100'>
            Sign up
          </button>
        </form>
        <p className='mt-4'>
          Already have account?{' '}
          <Link to={'/login'} className='font-bold text-pink-600'>
            Login here
          </Link>
        </p>
      </div>
    </section>
  )
}

export default SignUp
