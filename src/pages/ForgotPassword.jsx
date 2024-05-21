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
      console.log(error)
      toast.error(error.response.data.data)
    }
  }

  useEffect(() => {
    if (user?.name) navigate('/')
  }, [user])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='email' name='email' onChange={handleOnChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default ForgotPassword
