import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BASE_URL}/users`

const getAllUsers = async () => {
  try {
    const { data } = await axios.get(baseUrl, { withCredentials: true })
    return data
  } catch (error) {
    return error.response.data
  }
}

const signUpUser = async newUser => {
  try {
    const { data } = await axios.post(baseUrl, newUser)
    return data
  } catch (error) {
    return error.response.data
  }
}

const updateUser = async userData => {
  try {
    const { data } = await axios.put(`${baseUrl}/${userData.id}`, userData, {
      withCredentials: true
    })
    return data
  } catch (error) {
    return error.response.data
  }
}

export default { signUpUser, getAllUsers, updateUser }
