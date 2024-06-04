/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react'
import { FaRegUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import { useAuthContext } from '../hooks/useAuthContext'
import { IoMdArrowRoundBack } from 'react-icons/io'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const { login } = useLogin()

  const navigate = useNavigate()
  const { user } = useAuthContext()

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
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
    const credentials = {
      email: data.email,
      password: data.password,
    }
    await login(credentials)
  }

  useEffect(() => {
    if (user?.name) navigate('/')
  }, [user])

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
      <div className='w-full max-w-[430px] p-2 mb-16'>
        <div>
          <div className='flex gap-2 flex-col items-center justify-center text-5xl text-pink-600 mb-6'>
            <h3>Login</h3>
            <div className='text-6xl'>
              <FaRegUserCircle />
            </div>
          </div>
          <div className='border rounded-2xl p-2 my-4'>
            <p>user: admin@gmail.com</p>
            <p>password: admin</p>
            <p>or create your account</p>
          </div>
          <form onSubmit={handleSubmit} className='w-full'>
            <div>
              <label className='font-medium'>Email</label>
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
              <label className='font-medium'>Password</label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className='w-full border border-pink-400 h-12 rounded-lg mb-2 pl-2 outline-2 outline-pink-700 font-bold'
                />
                <div
                  onClick={handleShowPassword}
                  className='absolute right-3 top-4 z-10 text-lg hover:scale-125 duration-100'
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div className='w-full text-end mb-6 hover:text-pink-600'>
              <Link to={'/forgot-password'}>Forgot password?</Link>
            </div>

            <button className='w-full p-4 rounded-lg text-white text-xl font-medium bg-pink-600 hover:bg-pink-800 active:scale-95 duration-100'>
              Login
            </button>
          </form>
          <p className='mt-4'>
            Don't have account?{' '}
            <Link to={'/sign-up'} className='font-bold text-pink-600'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
