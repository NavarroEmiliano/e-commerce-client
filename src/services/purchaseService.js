import axios from 'axios'
import { getHeaderConfig } from '../helpers/token'
import calculateDiscountedPrice from '../helpers/calculateDiscountedPrice'
const baseUrl = `${import.meta.env.VITE_BASE_URL}/purchases`

const addNewPuchase = async (transaction, products) => {
  const purchaseObj = {
    transactionId: transaction.id,
    status: transaction.status,
    totalPrice: transaction.amount.value,
    userId: '',
    items: products.map((prod) => {
      const unitPrice = calculateDiscountedPrice(
        prod.productId.price,
        prod.productId.discountPercentage,
      )
      return {
        productId: prod.productId.id,
        quantity: prod.quantity,
        unitPrice,
      }
    }),
  }

  const { data } = await axios.post(baseUrl, purchaseObj, getHeaderConfig())
  return data
}

const getUserPurchases = async () => {
  const { data } = await axios.get(
    `${baseUrl}/user-purchases`,
    getHeaderConfig(),
  )
  return data.data
}

const getAllPurchases = async () => {
  const { data } = await axios.get(
    `${baseUrl}/all-purchases`,
    getHeaderConfig(),
  )
  return data.data
}

export default { addNewPuchase, getUserPurchases, getAllPurchases }
