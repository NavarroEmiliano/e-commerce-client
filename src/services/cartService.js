import axios from 'axios'
import { getHeaderConfig } from '../helpers/token'
const baseUrl = `${import.meta.env.VITE_BASE_URL}/cart`

const addToCart = async (productId) => {
  const { data } = await axios.post(
    baseUrl,
    { productId },
    getHeaderConfig(),
  )
  return data
}

const getUserCart = async () => {
    const { data } = await axios.get(baseUrl, getHeaderConfig())
    return data.data
}

const updateItemUserCart = async (obj) => {
    const { data } = await axios.post(`${baseUrl}/update`, obj, getHeaderConfig())
    return data.data

}

const deleteUserCartItem = async (id) => {
    const { data } = await axios.delete(`${baseUrl}/${id}`, getHeaderConfig())
    return data.data
}

const deleteUserCart = async () => {
  const { data } = await axios.delete(`${baseUrl}/delete-user-cart`, getHeaderConfig())
  return data.data
}

const countCart = async () => {
  const { data } = await axios.get(`${baseUrl}/count-user-cart`, getHeaderConfig())
  return data.data
}

export default {
  addToCart,
  getUserCart,
  updateItemUserCart,
  deleteUserCartItem,
  countCart,
  deleteUserCart
}
