import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/usersService'
import { toast } from 'react-toastify'

const initialState = []

export const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    setAllUsers: (state, action) => action.payload,
    cleanAllUsersAction: () => [],
    updateUser: (state, action) =>
      state.map(user => (user.id !== action.payload.id ? user : action.payload))
  }
})

export const { setAllUsers, cleanAllUsersAction, updateUser } =
  allUsersSlice.actions

export const initializeAllUsersAction = () => {
  return async dispatch => {
    const response = await usersService.getAllUsers()
    if (response.status === 'OK') dispatch(setAllUsers(response.data))
  }
}

export const updateUserAction = user => {
  return async dispatch => {
    const response = await usersService.updateUser(user)
    if (response.status === 'OK') {
      dispatch(updateUser(response.data))
      toast.success('User updated')
    }
    toast.error(response.data.data)
  }
}

export default allUsersSlice.reducer
