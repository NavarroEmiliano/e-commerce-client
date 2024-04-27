import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'

import userDetailsService from './services/userDetailsService'

const App = () => {

  useEffect(() => {
    const getUserDetails = async () => {
      await userDetailsService.fetchUserDetail()
    }
    getUserDetails()
  }, [])


  return (
    <>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      <Header />
      <main className='min-h-[calc(100vh-120px)]'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
