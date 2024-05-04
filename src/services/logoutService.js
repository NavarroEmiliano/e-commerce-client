import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BASE_URL}/user-logout`

const logoutUser = async () => {
  try {
    const { data } = await axios.get(baseUrl, { withCredentials: true })
    return data
  } catch (error) {
    return error.response.data
  }
}

export default { logoutUser }
