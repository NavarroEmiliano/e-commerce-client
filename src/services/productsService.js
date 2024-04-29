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
    const { data } = await axios.post(baseUrl, newProduct,{withCredentials:true})
    return data
  } catch (error) {
    return error.response.data
  }
}

/* const updateUser = async userData => {
  try {
    const { data } = await axios.put(`${baseUrl}/${userData.id}`, userData, {
      withCredentials: true
    })
    return data
  } catch (error) {
    return error.response.data
  }
} */

export default { getAllProducts, uploadProduct}
