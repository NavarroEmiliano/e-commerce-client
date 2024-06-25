/* eslint-disable react/prop-types */
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useState } from 'react'
import updateStock from '../services/updateStockService'
import purchaseService from '../services/purchaseService'
import cartService from '../services/cartService'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

const baseUrl = `${import.meta.env.VITE_BASE_URL}/orders`

const PaypalCheckoutButton = (props) => {
  const [message, setMessage] = useState('')
  const { products } = props
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const handleCreateOrder = async () => {
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          cart: products,
        }),
      })

      const orderData = await response.json()

      if (orderData.id) {
        return orderData.id
      } else {
        const errorDetail = orderData?.details?.[0]
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData)

        throw new Error(errorMessage)
      }
    } catch (error) {
      setMessage(`Could not initiate PayPal Checkout...${error}`)
    }
  }

  const handleOnApprove = async (data, actions) => {
    try {
      const response = await fetch(`${baseUrl}/${data.orderID}/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const orderData = await response.json()
      const errorDetail = orderData?.details?.[0]

      if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
        return actions.restart()
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`)
      } else {
        const transaction = orderData.purchase_units[0].payments.captures[0]
        setMessage(
          `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
        )

        await updateStock(products)
        await purchaseService.addNewPuchase(transaction, products)
        await cartService.deleteUserCart()
        queryClient.invalidateQueries(['countCart'])
        navigate('/purchase-success')
      }
    } catch (error) {
      console.error(error)
      setMessage(`Sorry, your transaction could not be processed...${error}`)
    }
  }

  return (
    <PayPalButtons
      style={{
        shape: 'rect',
        layout: 'vertical',
        color: 'gold',
        label: 'paypal',
      }}
      createOrder={handleCreateOrder}
      onApprove={handleOnApprove}
    />
  )
}

export default PaypalCheckoutButton
