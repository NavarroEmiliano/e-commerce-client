import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BASE_URL}/login`

const loginUser = async (userData) => {
  const { data } = await axios.post(baseUrl, userData)
  return data
}

export default { loginUser }
