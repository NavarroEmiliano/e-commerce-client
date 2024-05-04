import { createSlice } from '@reduxjs/toolkit'
import productsService from '../services/productsService'

const initialState = []

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => action.payload
  }
})

export const { setCategories } =
categorySlice.actions

export const initializeCategoriesAction = () => {
  return async dispatch => {
    const response = await productsService.getProductsByCategory()
    if (response.status === 'OK') dispatch(setCategories(response.data))
  }
}

export default categorySlice.reducer
