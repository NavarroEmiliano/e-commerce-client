import { configureStore } from '@reduxjs/toolkit'
import allUsersReducer from '../features/allUsersSlice'
import productsReducer from '../features/productsSlice'
import categoriesReducer from '../features/categorySlice'
import userCartReducer from '../features/userCartSlice'

export const store = configureStore({
  reducer: {
    allUsers: allUsersReducer,
    products: productsReducer,
    categories: categoriesReducer,
    userCart: userCartReducer
  },
})
