import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'

import 'react-loading-skeleton/dist/skeleton.css'
import 'react-multi-carousel/lib/styles.css'

const App = () => {
  const { pathname } = useLocation()

  console.log(pathname !== '/login' || pathname !== '/sign-up')

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <ToastContainer
        position={windowWidth < 1024 ? 'bottom-center' : 'top-center'}
        theme='colored'
        autoClose={3000}
      />
      {pathname !== '/login' && pathname !== '/sign-up' ? <Header /> : ''}

      <main className='mx-auto min-h-[calc(100vh-120px)] md:w-[90%] w-[95%]'>
        <Outlet />
      </main>

      {pathname !== '/login' && pathname !== '/sign-up' ? <Footer /> : ''}
    </>
  )
}

export default App
