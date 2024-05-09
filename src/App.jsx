import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'

import 'react-loading-skeleton/dist/skeleton.css'
import 'react-multi-carousel/lib/styles.css'
import { useAuth } from './context/AuthContext'

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const { setUserDetails } = useAuth()

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setUserDetails()
  }, [])

  return (
    <>
      <ToastContainer
        position={windowWidth < 1024 ? 'bottom-center' : 'top-center'}
        theme='colored'
        autoClose={3000}
      />
      <Header />
      <main className='mx-auto min-h-[calc(100vh-120px)] md:w-[90%] w-[95%]'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
