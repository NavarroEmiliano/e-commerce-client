import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import allUsersReducer from '../features/allUsersSlice'
import productsReducer from '../features/productsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    allUsers : allUsersReducer,
    products: productsReducer
  }
})
