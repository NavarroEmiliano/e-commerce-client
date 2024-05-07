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
    cleanUserCart: () => [],
    updateUserCartItem: (state, action) =>
      state.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      ),

    removeCartItem: (state, action) =>
      state.filter((item) => item.id !== action.payload),
  },
})

export const {
  setUserCart,
  addToCart,
  cleanUserCart,
  updateUserCartItem,
  removeCartItem,
} = userCartSlice.actions

export const initializeUserCartAction = () => {
  return async (dispatch) => {
    const response = await cartService.getUserCart()
    if (response.status === 'OK') dispatch(setUserCart(response.data))
  }
}

export const addToCartAction = (productId) => {
  return async (dispatch) => {
    const response = await cartService.addToCart(productId)

    if (response.status === 'OK') {
      dispatch(addToCart(response.data))
      toast.success('Product added to cart')
    } else {
      toast.error(response.data)
    }
  }
}

export const updateQuantityCartItemAction = (obj) => {
  return async (dispatch) => {
    const response = await cartService.updateItemUserCart(obj)
    if (obj.quantity === 0) return dispatch(removeCartItem(obj.id))

    if (response.status === 'OK') {
      dispatch(updateUserCartItem(response.data))
    } else {
      toast.error(response.data)
    }
  }
}

export const deleteCartItemAction = (id) => {
  return async (dispatch) => {
    const response = await cartService.deleteUserCartItem(id)

    if (response.status === 'OK') {
      toast.success('Product removed from cart.')
      return dispatch(removeCartItem(id))
    } else {
      toast.error(response.data)
    }
  }
}

export default userCartSlice.reducer
