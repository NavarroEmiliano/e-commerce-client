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
    <form onSubmit={handleSubmit}>
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
          <div onClick={handleShowPassword} className='cursor-pointer'>
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
            required
            className='w-full h-full outline-none bg-transparent'
          />
          <div onClick={handleShowConfirmPassword} className='cursor-pointer'>
            <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div>
        </div>
      </div>
      <button>Update password</button>
    </form>
  )
}

export default ResetPassword
