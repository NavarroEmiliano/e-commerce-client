import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BASE_URL}/users`

const forgotPassword = async (email) => {
  const { data } = await axios.post(`${baseUrl}/forgot-password`,email)
  return data.data
}

export default {
  forgotPassword,
}
