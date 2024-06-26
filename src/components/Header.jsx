import { LuShoppingCart, LuUser2, LuBoxes } from 'react-icons/lu'
import { Link, useLocation } from 'react-router-dom'

import { useState } from 'react'
import ROLE from '../common/role'
import { TbLayoutDashboard } from 'react-icons/tb'
import { BiPurchaseTagAlt, BiCategoryAlt } from 'react-icons/bi'

import { IoMdArrowRoundBack } from 'react-icons/io'
import { GrHomeRounded } from 'react-icons/gr'

import { useQuery } from '@tanstack/react-query'
import cartService from '../services/cartService'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import SearchBar from './SearchBar'

import { IoMenu } from 'react-icons/io5'
import useBlockScroll from '../hooks/useBlockScroll'

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { user } = useAuthContext()
  const { pathname } = useLocation()
  const { logout } = useLogout()

  useBlockScroll(showMobileMenu)

  const { data: countCart } = useQuery({
    queryKey: ['countCart'],
    queryFn: cartService.countCart,
    enabled: !!user,
    retry: false,
    refetchOnWindowFocus: false,
  })

  const handleLogout = () => {
    setShowMobileMenu((prev) => !prev)
    logout()
  }

  const handleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev)
  }

  const isAdmin = user?.role === ROLE.ADMIN

  return (
    /* Mobile */

    <header className='flex items-center h-14 py-4 px-2 bg-pink-600 justify-between w-full sm:px-20 lg:px-32'>
      <div className='relative flex justify-end items-center gap-2 text-xl'>
        <IoMenu onClick={handleMobileMenu} className='cursor-pointer' />
        <Link to='/' className='text-pink-100 hidden md:block absolute sm:-right-28'>
          Pulse-Tech
        </Link>
      </div>
      {pathname.includes('admin-panel') && (
        <div className='text-pink-800 text-lg font-semibold'>Admin panel</div>
      )}
      {pathname === '/all-products' && (
        <div className='text-pink-800 text-lg font-semibold'>All Products</div>
      )}

      {pathname === '/my-purchases' && (
        <div className='text-pink-800 text-lg font-semibold'>My Purchases</div>
      )}

      {pathname === '/categories' && (
        <div className='text-pink-800 text-lg font-semibold'>Categories</div>
      )}

      {pathname === '/cart' && (
        <div className='text-pink-800 text-lg font-semibold'>Cart</div>
      )}

      {pathname.includes('categories/') && (
        <div className='text-pink-800 text-lg font-semibold capitalize'>
          {pathname.split('/')[2]}
        </div>
      )}
      {pathname === '/' || pathname.includes('search') ? <SearchBar /> : ''}

      {showMobileMenu && (
        <div className='fixed z-30 bg-black/65 top-0 right-0 left-0 bottom-0 '></div>
      )}

      {/* Menu mobile */}
      <div
        className={`fixed p-6 top-0 left-0 bottom-0 bg-white rounded-r-xl w-full max-w-[300px] z-50 transform transition-transform ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} duration-500`}
      >
        <div
          onClick={handleMobileMenu}
          className='absolute top-2 right-2 text-2xl text-pink-600 cursor-pointer'
        >
          <IoMdArrowRoundBack />
        </div>
        <div className='flex flex-col justify-between h-full'>
          <div>
            <div className='flex items-center gap-2'>
              <div className='text-2xl flex items-center justify-center bg-pink-600 h-10 w-10 rounded-full'>
                <LuUser2 />
              </div>
              <p className='font-bold'>{user?.name}</p>
            </div>
            <div className='flex flex-col mt-4'>
              <Link
                to='/'
                className='flex items-center gap-2 p-3 hover:bg-pink-600 rounded-xl'
                onClick={handleMobileMenu}
              >
                <GrHomeRounded className='mb-1'/>
                Home
              </Link>
              <Link
                to='/all-products'
                className='flex items-center gap-2 p-3 hover:bg-pink-600 rounded-xl'
                onClick={handleMobileMenu}
              >
                <LuBoxes />
                All Products
              </Link>
              {isAdmin && (
                <Link
                  to='admin-panel/all-products'
                  className='flex items-center gap-2 p-3 hover:bg-pink-600 rounded-xl'
                  onClick={handleMobileMenu}
                >
                  <TbLayoutDashboard />
                  Dashboard
                </Link>
              )}

              {user && (
                <Link
                  to='my-purchases'
                  className='flex items-center gap-2 p-3 hover:bg-pink-600 rounded-xl'
                  onClick={handleMobileMenu}
                >
                  <BiPurchaseTagAlt />
                  My Purchases
                </Link>
              )}

              <Link
                onClick={handleMobileMenu}
                to='categories'
                className='flex items-center gap-2 p-3 hover:bg-pink-600 rounded-xl'
              >
                <BiCategoryAlt />
                Categories
              </Link>
              {/*               {user && (
                <Link
                  className='flex items-center gap-2 p-3 hover:bg-pink-600 rounded-xl'
                  onClick={handleMobileMenu}
                >
                  <LuUser2 />
                  My account
                </Link>
              )} */}
            </div>
          </div>

          {user && (
            <button
              className='w-full bg-pink-600 border-2 p-3 rounded-xl text-lg active:scale-95 active:bg-pink-800 duration-100'
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {user ? (
        <Link to='cart' className='pr-2'>
          <div className='relative'>
            <span className='text-xl'>
              <LuShoppingCart />
            </span>
            <div className='absolute h-4 text-center -top-2 -right-2 bg-pink-600 text-white text-sm'>
              <p>{countCart > 9 ? '+9' : countCart}</p>
            </div>
          </div>
        </Link>
      ) : (
        <Link
          className='flex items-center justify-center border-2  px-2 rounded-lg h-8 font-semibold hover:bg-white'
          to={'login'}
        >
          Login
        </Link>
      )}
    </header>
  )
}

export default Header
