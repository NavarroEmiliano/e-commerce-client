import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from '../features/categorySlice'
import userCartReducer from '../features/userCartSlice'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    userCart: userCartReducer
  },
})
