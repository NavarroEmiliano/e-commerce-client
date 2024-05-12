import axios from 'axios'
import { getHeaderConfig } from '../helpers/token'
const baseUrl = `${import.meta.env.VITE_BASE_URL}/products`

const getAllProducts = async () => {
    const { data } = await axios.get(baseUrl)
    return data.data
}

export const uploadProduct = async (newProduct) => {
    const { data } = await axios.post(baseUrl, newProduct, getHeaderConfig())
    return data
}

const updateProduct = async (productData) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/${productData.id}`,
      productData,getHeaderConfig(),
    )
    return data
  } catch (error) {
    return error.response.data
  }
}

const getProductsByCategory = async (category) => {
  const { data } = await axios.get(`${baseUrl}/category/${category}`)
  return data
}

const getProductsById = async (id) => {
  try {
    const { data } = await axios.get(`${baseUrl}/${id}`)
    return data
  } catch (error) {
    return error.response.data
  }
}

const getOneProductPerCategory = async () => {
  const { data } = await axios.get(`${baseUrl}/one-per-category`)
  return data
}

const getAllBrands = async () => {
  const { data } = await axios.get(`${baseUrl}/all-brands`)
  return data
}

const getAllCategories = async () => {
  const { data } = await axios.get(`${baseUrl}/all-categories`)
  return data
}

const deleteProduct = async (id) => {
    const { data } = await axios.delete(`${baseUrl}/${id}`, getHeaderConfig())
    return data.data

}

export default {
  getAllProducts,
  updateProduct,
  getProductsByCategory,
  getProductsById,
  getOneProductPerCategory,
  getAllBrands,
  getAllCategories,
  deleteProduct
}
