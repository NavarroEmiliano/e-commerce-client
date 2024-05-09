import { useEffect, useState } from 'react'
import userDetailsService from '../services/userDetailsService'

export const useUser = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(null)
  const getUserLoggedIn = async () => {
    try {
      const response = await userDetailsService.fetchUserDetail()
      setUserLoggedIn(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
   if(userLoggedIn === null) getUserLoggedIn()
  }, [])

  return {
    userLoggedIn,
    setUserLoggedIn,
  }
}
