import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_BASE_URL}/user-details`

const fetchUserDetail = async (token) => {
  const { data } = await axios.post(baseUrl, { token })
  return data
}

export default { fetchUserDetail }
