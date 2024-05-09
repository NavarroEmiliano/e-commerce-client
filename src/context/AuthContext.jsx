/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react'
import userDetailsService from '../services/userDetailsService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // Función para iniciar sesión
  const login = async () => {}

  // Función para cerrar sesión
  const logout = async () => {
    // Lógica para cerrar sesión y limpiar el estado de usuario
    // setUser(null);
  }

  const setUserDetails = async () => {
    try {
      const response = await userDetailsService.fetchUserDetail()
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, setUserDetails }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
