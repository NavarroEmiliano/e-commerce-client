import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BASE_URL}/users`


const getAllUsers = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const signUpUser = async newUser => {
  try {
    const { data } = await axios.post(baseUrl, newUser)
    return data
  } catch (error)  {
    return error.response.data
  }

}


export default { signUpUser, getAllUsers }
