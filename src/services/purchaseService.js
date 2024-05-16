import axios from 'axios'
import { getHeaderConfig } from '../helpers/token'
const baseUrl = `${import.meta.env.VITE_BASE_URL}/purchases`

const addNewPuchase = async (transaction, products) => {
  const purchaseObj = {
    id: transaction.id,
    status: transaction.status,
    totalPrice: transaction.amount.value,
    userId: '',
    items: products.map((prod) => {
      return {
        productId: prod.productId.id,
        quantity: prod.quantity,
      }
    }),
  }

  const { data } = await axios.post(baseUrl, purchaseObj, getHeaderConfig())
  return data
}

export default { addNewPuchase }
