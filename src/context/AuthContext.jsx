/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react'
import userDetailsService from '../services/userDetailsService'
import logoutService from '../services/logoutService'
import loginService from '../services/loginService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const setUserDetails = async () => {
    try {
      const response = await userDetailsService.fetchUserDetail()
      setUser(response?.data)
    } catch (error) {
      setUser(null)
      return error
    }
  }

  const login = async (credentials) => {
    await loginService.loginUser(credentials)
    await setUserDetails()
  }

  const logout = async () => {
    try {
      await logoutService.logoutUser()
      setUser(null)
    } catch (error) {
      return error
    }
  }

  return (
    <AuthContext.Provider value={{ user, logout, login, setUserDetails }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
