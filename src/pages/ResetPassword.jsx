/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import forgotPasswordService from '../services/forgotPasswordService'
import { isStrongPassword } from '../utils/isStrongPassword'
import { useAuthContext } from '../hooks/useAuthContext'

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setData] = useState({
    password: '',
    confirmPassword: '',
  })

  const { id, token } = useParams()

  const navigate = useNavigate()

  const { user } = useAuthContext()

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

      const credentials = {
        id,
        token,
        password: data.password,
      }
      const response = await forgotPasswordService.resetPassword(credentials)
      toast.success(response)
      navigate('/login')
    } catch (error) {
      toast.error(error.response.data.data)
    }
  }

  useEffect(() => {
    if (user?.name) navigate('/')
  }, [user])

  return (
    <div className='relative px-4 flex flex-col items-center justify-center min-h-[calc(100vh-109px)]'>
      <div className='w-full max-w-[430px] mb-6'>
        "Reset Password Enter your new password below. Make sure it's strong and
        unique to keep your account secure. Thank you!"
      </div>
      <form onSubmit={handleSubmit} className='w-full max-w-[430px]'>
        <div>
          <label className='font-medium'>Password</label>
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
          <label className='font-medium'>Confirm password</label>
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
              <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
            </div>
          </div>
        </div>
        <button className='w-full p-4 rounded-lg text-white text-xl font-medium bg-pink-600 hover:bg-pink-800 active:scale-95 duration-100'>
          Update password
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
