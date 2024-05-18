import { useState } from 'react'
import forgotPasswordService from '../services/forgotPasswordService'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

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
