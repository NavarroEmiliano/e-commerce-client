import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_BASE_URL}/user-details`

const fetchUserDetail = async () => {
    const { data } = await axios.get(baseUrl, { withCredentials: true })
    return data
}

export default { fetchUserDetail }
