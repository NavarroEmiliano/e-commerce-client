import { useState } from 'react'
import usersService from '../services/usersService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const navigate = useNavigate()

  const signup = async (newUser) => {
    setIsLoading(true)
    setError(null)
    try {
      await usersService.signUpUser(newUser)
      setIsLoading(false)
      setError(false)
      navigate('/login')
      toast.success('User created successfully')
    } catch (error) {
      setIsLoading(false)
      setError(error.data)
      toast.error(error.response.data.data)
    }
  }

  return { signup, isLoading, error }
}
