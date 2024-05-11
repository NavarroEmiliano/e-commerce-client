import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setToken } from '../helpers/token'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      window.localStorage.removeItem('loggedPulseTechUserToken')
      setToken(null)
      dispatch({ type: 'LOGOUT' })
      navigate('/')
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error(error.response.data.data)
    }
  }

  return { logout }
}
