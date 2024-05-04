import { createSlice } from '@reduxjs/toolkit'
import cartService from '../services/cartService'
import { toast } from 'react-toastify'

const initialState = []

export const userCartSlice = createSlice({
  name: 'userCart',
  initialState,
  reducers: {
    setUserCart: (_state, action) => action.payload,
    addToCart: (state, action) => [...state, action.payload],
    cleanUserCart: () => []
  }
})

export const { setUserCart, addToCart, cleanUserCart } = userCartSlice.actions

export const initializeUserCartAction = () => {
  return async dispatch => {
    const response = await cartService.getUserCart()
    if (response.status === 'OK') dispatch(setUserCart(response.data))
  }
}

export const addToCartAction = productId => {
  return async dispatch => {
    const response = await cartService.addToCart(productId)

    if (response.status === 'OK') {
      dispatch(addToCart(response.data))
      toast.success('Product added to cart')
    } else {
      toast.error(response.data)
    }
  }
}

export default userCartSlice.reducer
