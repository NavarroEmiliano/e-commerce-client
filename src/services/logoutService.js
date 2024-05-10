import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BASE_URL}/user-logout`

const logoutUser = async () => {
    const { data } = await axios.post(baseUrl, { withCredentials: true })
    return data
}

export default { logoutUser }
