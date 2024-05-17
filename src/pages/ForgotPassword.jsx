import { useState } from 'react'
import forgotPasswordService from '../services/forgotPasswordService'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const handleOnChange = (e) => {
    const { value } = e.target
    setEmail(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await forgotPasswordService.forgotPassword({ email })
    console.log(response)
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
