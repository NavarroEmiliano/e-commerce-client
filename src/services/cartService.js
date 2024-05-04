import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BASE_URL}/cart`

const addToCart = async (productId) => {
  try {
    const { data } = await axios.post(
      baseUrl,
      { productId },
      { withCredentials: true },
    )
    return data
  } catch (error) {
    return error.response.data
  }
}

const getUserCart = async () => {
  try {
    const { data } = await axios.get(baseUrl, { withCredentials: true })
    return data
  } catch (error) {
    return error.response.data
  }
}

export default { addToCart, getUserCart }
