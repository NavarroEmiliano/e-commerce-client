import { useState } from 'react'
import loginService from '../services/loginService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuthContext } from './useAuthContext'
import userDetailsService from '../services/userDetailsService'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()

  const login = async (credentials) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data: token } = await loginService.loginUser(credentials)
      localStorage.setItem('loggedPulseTechUserToken', token)
      const { data } = await userDetailsService.fetchUserDetail(token)
      dispatch({ type: 'LOGIN', payload: data })
      setIsLoading(false)
      setError(false)
      navigate('/')
      toast.success('Login successfully')
    } catch (error) {
      setIsLoading(false)
      setError(error.data)
      toast.error(error.response.data.data)
    }
  }

  return { login, isLoading, error }
}
