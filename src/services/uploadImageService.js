import axios from 'axios'

const cloudinaryCloudName = import.meta.env.VITE_CLOUD_NAME_CLOUDINARY
const baseUrl = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`

const uploadImage = async image => {
  const formData = new FormData()
  formData.append('file', image)
  formData.append('upload_preset', 'pulsetech_e_commerce_product')
  try {
    const response = await axios.post(baseUrl, formData)

    return { status: response.statusText, data: response.data.url }
  } catch (error) {
    return { status: 'FAILED', data: error.response.data }
  }
}

export default { uploadImage }
