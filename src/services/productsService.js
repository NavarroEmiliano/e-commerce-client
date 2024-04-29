import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BASE_URL}/products`

const getAllProducts = async () => {
  try {
    const { data } = await axios.get(baseUrl)
    return data
  } catch (error) {
    return error.response.data
  }
}

const uploadProduct = async newProduct => {
  try {
    const { data } = await axios.post(baseUrl, newProduct, {
      withCredentials: true
    })
    return data
  } catch (error) {
    return error.response.data
  }
}

const updateProduct = async productData => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/${productData.id}`,
      productData,
      {
        withCredentials: true
      }
    )
    return data
  } catch (error) {
    return error.response.data
  }
}

const getProductsByCategory = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/by-category`)
    return data
  } catch (error) {
    return error.response.data
  }
}

export default {
  getAllProducts,
  uploadProduct,
  updateProduct,
  getProductsByCategory
}
