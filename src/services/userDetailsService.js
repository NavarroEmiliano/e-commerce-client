import axios from 'axios'
import { getHeaderConfig } from '../helpers/token'

const baseUrl = `${import.meta.env.VITE_BASE_URL}/user-details`

const fetchUserDetail = async () => {
  const { data } = await axios.get(baseUrl, getHeaderConfig())
  return data
}

export default { fetchUserDetail }
