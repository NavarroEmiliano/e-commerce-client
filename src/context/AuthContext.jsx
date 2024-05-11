/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect } from 'react'
import userDetailsService from '../services/userDetailsService'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null })

  console.log('AuthContext state:', state)

  useEffect(() => {
    const setUserLogged = async (token) => {
      try {
        const { data } = await userDetailsService.fetchUserDetail(token)
        dispatch({ type: 'LOGIN', payload: data })
      } catch (error) {
        return error
      }
    }
    const token = window.localStorage.getItem('loggedPulseTechUserToken')
    if (token) setUserLogged(token)
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
