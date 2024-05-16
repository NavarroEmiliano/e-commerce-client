/* eslint-disable react/prop-types */
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useState } from 'react'
import updateStock from '../services/updateStockService'

const baseUrl = `${import.meta.env.VITE_BASE_URL}/orders`

const PaypalCheckoutButton = (props) => {
  const { products } = props
  const [message, setMessage] = useState('')

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
      console.log(data.orderID)
      const response = await fetch(`${baseUrl}/${data.orderID}/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const orderData = await response.json()
      const errorDetail = orderData?.details?.[0]

      if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
        return actions.restart()
      } else if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`)
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        const transaction = orderData.purchase_units[0].payments.captures[0]
        setMessage(
          `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
        )

        console.log(
          'Capture result',
          orderData,
          JSON.stringify(orderData, null, 2),
        )
        await updateStock(products)
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
