import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import allUsersReducer from '../features/allUsersSlice'
import productsReducer from '../features/productsSlice'
import categoriesReducer from '../features/categorySlice'
import userCartReducer from '../features/userCartSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUsersReducer,
    products: productsReducer,
    categories: categoriesReducer,
    userCart: userCartReducer,
  },
})
