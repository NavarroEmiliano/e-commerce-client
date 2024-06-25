/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react'
import forgotPasswordService from '../services/forgotPasswordService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const { user } = useAuthContext()

  const handleOnChange = (e) => {
    const { value } = e.target
    setEmail(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await forgotPasswordService.forgotPassword({ email })
      toast.success(response)
    } catch (error) {
      toast.error(error.response.data.data)
    }
  }

  useEffect(() => {
    if (user?.name) navigate('/')
  }, [user])

  return (
    <div className='flex p-4 flex-col w-full items-center justify-center min-h-[calc(100vh-109px)]'>
      <div className='w-full max-w-[430px] mb-6'>
        "Forgot your password? Enter your email below and we'll send you a link
        to reset your password. Thank you!"
      </div>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center w-full max-w-[430px]'
      >
        <input
          type='email'
          name='email'
          onChange={handleOnChange}
          className='w-full max-w-[430px] border border-pink-400 h-12 rounded-lg mb-6 pl-2 outline-2 outline-pink-700 font-bold'
        />
        <button className='w-full p-4 rounded-lg text-white text-xl font-medium bg-pink-600 hover:bg-pink-800 active:scale-95 duration-100'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
