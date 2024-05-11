import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      window.localStorage.removeItem('loggedPulseTechUserToken')
      dispatch({ type: 'LOGOUT' })
      navigate('/')
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error(error.response.data.data)
    }
  }

  return { logout }
}
