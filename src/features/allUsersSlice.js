import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/usersService'

const initialState = []

export const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    setAllUsers: (state, action) => action.payload,
    cleanAllUsersAction: () => []
  }
})

export const { setAllUsers, cleanAllUsersAction } = allUsersSlice.actions

export const initializeAllUsersAction = () => {
  return async dispatch => {
    const response = await usersService.getAllUsers()
    if (response.status === 'OK') dispatch(setAllUsers(response.data))
  }
}

export default allUsersSlice.reducer
