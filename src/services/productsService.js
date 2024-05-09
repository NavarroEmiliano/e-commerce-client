import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BASE_URL}/products`

const getAllProducts = async () => {
    const { data } = await axios.get(baseUrl)
    return data
}

const uploadProduct = async (newProduct) => {
  try {
    const { data } = await axios.post(baseUrl, newProduct, {
      withCredentials: true,
    })
    return data
  } catch (error) {
    return error.response.data
  }
}

const updateProduct = async (productData) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/${productData.id}`,
      productData,
      {
        withCredentials: true,
      },
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

export default {
  getAllProducts,
  uploadProduct,
  updateProduct,
  getProductsByCategory,
  getProductsById,
  getOneProductPerCategory,
}
