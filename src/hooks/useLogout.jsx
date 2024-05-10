import { useAuthContext } from './useAuthContext'
import logoutService from '../services/logoutService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await logoutService.logoutUser()
      dispatch({ type: 'LOGOUT' })
      navigate('/')
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error(error.response.data.data)
    }
  }

  return { logout }
}
