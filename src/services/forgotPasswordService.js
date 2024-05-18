import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BASE_URL}/users`

const forgotPassword = async (email) => {
  const { data } = await axios.post(`${baseUrl}/forgot-password`, email)
  return data.data
}

const resetPassword = async ({ id, token, password }) => {
  const { data } = await axios.post(
    `${baseUrl}/reset-password/${id}/${token}`,
    { password },
  )
  return data.data
}

export default {
  forgotPassword,
  resetPassword,
}
