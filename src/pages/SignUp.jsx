/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { IoCreateOutline } from 'react-icons/io5'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { toast } from 'react-toastify'
import { useSignup } from '../hooks/useSignup'
import { isStrongPassword } from '../utils/isStrongPassword'
import { useAuthContext } from '../hooks/useAuthContext'
import { IoMdArrowRoundBack } from 'react-icons/io'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { signup } = useSignup()

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev)
  }

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
        className='absolute text-3xl text-pink-700 pt-2 top-0 right-0'
      >
        <IoMdArrowRoundBack />
      </Link>
      <div className='w-full max-w-[430px] p-2 mb-16'>
        <div>
          <div className='flex flex-col items-center justify-center text-5xl text-pink-700 mb-6'>
            <h3>Sign up</h3>
            <div className='text-6xl'>
              <IoCreateOutline />
            </div>
          </div>

          <form onSubmit={handleSubmit} className='w-full'>
            <div>
              <label className='font-medium'>Name</label>
              <div>
                <input
                  type='text'
                  name='name'
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className='w-full border border-pink-400 h-12 rounded-lg mb-6 pl-2 outline-2 outline-pink-700 font-bold'
                />
              </div>
            </div>

            <div>
              <label className='font-medium'>Email </label>
              <div>
                <input
                  type='email'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className='w-full border border-pink-400 h-12 rounded-lg mb-6 pl-2 outline-2 outline-pink-700 font-bold'
                />
              </div>
            </div>

            <div>
              <label className='font-medium'>Password </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className='w-full border border-pink-400 h-12 rounded-lg mb-6 pl-2 outline-2 outline-pink-700 font-bold'
                />
                <div
                  onClick={handleShowPassword}
                  className='absolute right-3 top-4 z-10 text-lg hover:scale-125 duration-100'
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label className='font-medium'>Confirm password </label>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                  className='w-full border border-pink-400 h-12 rounded-lg mb-6 pl-2 outline-2 outline-pink-700 font-bold'
                />
                <div
                  onClick={handleShowConfirmPassword}
                  className='absolute right-3 top-4 z-10 text-lg hover:scale-125 duration-100'
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className='w-full p-4 rounded-lg text-white text-xl font-medium bg-pink-700 hover:bg-pink-800 active:scale-95 duration-100'>
              Sign up
            </button>
          </form>
          <p className='mt-4'>
            Already have account?{' '}
            <Link to={'/login'} className='font-bold text-pink-700'>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default SignUp
