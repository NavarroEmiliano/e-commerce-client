import { createSlice } from '@reduxjs/toolkit'
import userDetailsService from '../services/userDetailsService'
import logoutService from '../services/logoutService'

const initialState = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => action.payload,
    cleanUserDetails: () => null
  }
})

export const { setUserDetails, cleanUserDetails } = userSlice.actions

export const initializeUserDetails = () => {
  return async dispatch => {
    const response = await userDetailsService.fetchUserDetail()
    if (response.status === 'OK') dispatch(setUserDetails(response.data))
  }
}

export const logoutUserAction = () => {
  return async dispatch => {
    const response = await logoutService.logoutUser()
    if (response.status === 'OK') dispatch(cleanUserDetails())
  }
}

export default userSlice.reducer
