import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BASE_URL}/cart`

const addToCart = async (productId) => {
  const { data } = await axios.post(
    baseUrl,
    { productId },
    { withCredentials: true },
  )
  return data
}

const getUserCart = async () => {
  try {
    const { data } = await axios.get(baseUrl, { withCredentials: true })
    return data
  } catch (error) {
    return error.response.data
  }
}

const updateItemUserCart = async (obj) => {
  try {
    const { data } = await axios.post(`${baseUrl}/update`, obj, {
      withCredentials: true,
    })
    return data
  } catch (error) {
    return error.response.data
  }
}

const deleteUserCartItem = async (id) => {
  try {
    const { data } = await axios.delete(`${baseUrl}/${id}`, {
      withCredentials: true,
    })
    return data
  } catch (error) {
    return error.response.data
  }
}

const countCart = async () => {
  const { data } = await axios.get(`${baseUrl}/count-user-cart`, {
    withCredentials: true,
  })
  return data
}

export default {
  addToCart,
  getUserCart,
  updateItemUserCart,
  deleteUserCartItem,
  countCart,
}
