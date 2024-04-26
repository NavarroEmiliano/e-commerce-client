import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BASE_URL}/login`

const loginUser = async userData => {
  try {
    const { data } = await axios.post(baseUrl, userData,{withCredentials:true})
    return data
  } catch (error) {
    return error.response.data
  }
}


export default { loginUser }