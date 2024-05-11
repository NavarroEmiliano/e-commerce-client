import axios from 'axios'
import { getHeaderConfig } from '../helpers/token'
const baseUrl = `${import.meta.env.VITE_BASE_URL}/users`


const getAllUsers = async () => {
  try {
    const { data } = await axios.get(baseUrl, getHeaderConfig())
    return data
  } catch (error) {
    return error.response.data
  }
}

const signUpUser = async (newUser) => {
  const { data } = await axios.post(baseUrl, newUser)
  return data
}

const updateUser = async (userData) => {
  try {
    const { data } = await axios.put(`${baseUrl}/${userData.id}`, userData, getHeaderConfig())
    return data
  } catch (error) {
    return error.response.data
  }
}

export default { signUpUser, getAllUsers, updateUser }
