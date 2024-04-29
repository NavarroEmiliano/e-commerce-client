import { createSlice } from '@reduxjs/toolkit'
import productsService from '../services/productsService'
import { toast } from 'react-toastify'

const initialState = []

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAllProducts: (state, action) => action.payload,
    cleanAllProdutsAction: () => [],
    addProduct: (state, action) => [...state, action.payload],
    updateProduct: (state, action) =>
    state.map(product => (product.id !== action.payload.id ? product : action.payload))
  }
})

export const { setAllProducts, cleanAllProdutsAction, addProduct,updateProduct } =
  productsSlice.actions

export const initializeAllProductsAction = () => {
  return async dispatch => {
    const response = await productsService.getAllProducts()
    if (response.status === 'OK') dispatch(setAllProducts(response.data))
  }
}

export const uploadProductAction = (product, closeModal) => {
  return async dispatch => {
    const response = await productsService.uploadProduct(product)
    if (response.status === 'OK') {
      dispatch(addProduct(response.data))
      toast.success('Product uploaded successfully')
      closeModal()
    }
    toast.error(response.data)
  }
}

export const updateProductAction = (product , closeModal) => {
  return async dispatch => {
    const response = await productsService.updateProduct(product)
    if (response.status === 'OK') {
      dispatch(updateProduct(response.data))
      toast.success('User updated')
      closeModal()
    }
    toast.error(response.data)
  }
}


export default productsSlice.reducer
