/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect, useState } from 'react'
import userDetailsService from '../services/userDetailsService'
import { setToken } from '../helpers/token'

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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const setUserLogged = async (token) => {
      try {
        setToken(token)
        const { data } = await userDetailsService.fetchUserDetail()
        dispatch({ type: 'LOGIN', payload: data })
      } catch (error) {
        return error
      } finally {
        setIsLoading(false)
      }
    }
    const token = window.localStorage.getItem('loggedPulseTechUserToken')
    if (token && !state?.user) {
      setUserLogged(token)
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
