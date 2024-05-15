import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_BASE_URL}/orders`

const createOrder = async (productsToOrder) => {

  const cart = {
    cart: [...productsToOrder],
  }

  const { data } = await axios.post(baseUrl, cart)

  if (data.id) {
    return data.id
  } else {
    const errorDetail = data?.details?.[0]
    const errorMessage = errorDetail
      ? `${errorDetail.issue} ${errorDetail.description} (${data.debug_id})`
      : JSON.stringify(data)

    throw new Error(errorMessage)
  }
}

export default {
  createOrder,
}
