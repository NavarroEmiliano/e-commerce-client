import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/productsSlice'
import categoriesReducer from '../features/categorySlice'
import userCartReducer from '../features/userCartSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    userCart: userCartReducer
  },
})
