import axios from 'axios'

const updateStock = async (products) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/update-stock`,
    {
      products: products.map((product) => ({
        productId: product.productId.id,
        quantitySold: product.quantity,
      })),
    },
  )

  return response.data
}

export default updateStock
