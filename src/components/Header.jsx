import { LuShoppingCart, LuUser2 } from 'react-icons/lu'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import UserImg from './UserImg'
import { useState } from 'react'
import ROLE from '../common/role'
import { TbLayoutDashboard } from 'react-icons/tb'
import { BiPurchaseTagAlt, BiCategoryAlt } from 'react-icons/bi'
import { MdFavoriteBorder } from 'react-icons/md'
import { IoMdArrowRoundBack } from 'react-icons/io'

import { useQuery } from '@tanstack/react-query'
import cartService from '../services/cartService'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import SearchBar from './SearchBar'
import productsService from '../services/productsService'

import { IoMenu } from 'react-icons/io5'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { user } = useAuthContext()
  const { pathname } = useLocation()
  const { logout } = useLogout()
  const navigate = useNavigate()

  const { data: countCart } = useQuery({
    queryKey: ['countCart'],
    queryFn: cartService.countCart,
    enabled: !!user,
    retry: false,
    refetchOnWindowFocus: false,
  })

  const { data: allCategories } = useQuery({
    queryKey: ['allCategories'],
    queryFn: productsService.getAllCategories,
  })

  const handleLogout = () => {
    setShowMobileMenu((prev) => !prev)
    logout()
  }

  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev)
  }

  const handleChangeSelect = (e) => {
    if (e.target.value === 'categories') {
      return navigate('/')
    }
    navigate(`product-category/${e.target.value}`)
  }

  const isAdmin = user?.role === ROLE.ADMIN

  return (
    /* Mobile */

    <header className='flex items-center h-14 p-4 bg-pink-600 justify-between w-full'>
      <div onClick={handleMobileMenu} className='text-xl cursor-pointer'>
        <IoMenu />
      </div>
      <SearchBar />

      {showMobileMenu && (
        <div className='fixed z-30 bg-black/65 top-0 right-0 left-0 bottom-0'></div>
      )}

      {/* Menu mobile */}
      <div
        className={`fixed p-6 top-0 left-0 bottom-0 bg-white rounded-r-xl w-[50%] z-50 transform transition-transform ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} duration-500`}
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
              {isAdmin && (
                <Link className='flex items-center gap-2 p-3 hover:bg-pink-600 rounded-xl'>
                  <TbLayoutDashboard />
                  Dashboard
                </Link>
              )}

              {user && (
                <Link className='flex items-center gap-2 p-3 hover:bg-pink-600 rounded-xl'>
                  <BiPurchaseTagAlt />
                  Purchases
                </Link>
              )}

              <Link className='flex items-center gap-2 p-3 hover:bg-pink-600 rounded-xl'>
                <BiCategoryAlt />
                Categories
              </Link>
              {user && (
                <Link className='flex items-center gap-2 p-3 hover:bg-pink-600 rounded-xl'>
                  <LuUser2 />
                  My account
                </Link>
              )}
            </div>
          </div>

          <button
            className='w-full bg-pink-600 border-2 p-3 rounded-xl text-lg active:scale-95 active:bg-pink-800 duration-100'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {user ? (
        <Link to='cart'>
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

    /* <header className='flex bg-pink-600'>
      <div className='flex w-full'>
        <Link to='/'>
          <div>Pulse-Tech</div>
        </Link>

        {pathname !== '/admin-panel/all-products' && <SearchBar />}

        <Link to='/all-products'>
          <div>All products</div>
        </Link>

        <select name='categories' onChange={handleChangeSelect}>
          <option value='categories'>Categories</option>
          {allCategories?.map((categ) => (
            <option key={categ} value={categ}>
              {categ}
            </option>
          ))}
        </select>

        <div>
          <div onClick={handleMenu}>
            {user && (
              <div>
                <UserImg textSize='sm' userName={user?.name} />
              </div>
            )}

            {showMenu && (
              <div>
                <nav>
                  <Link to='view-purchases' onClick={handleMenu}>
                    View Purchases
                  </Link>
                  {user?.role === ROLE.ADMIN && (
                    <Link to='admin-panel/all-products' onClick={handleMenu}>
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user && (
            <Link to='cart'>
              <div>
                <span>
                  <LuShoppingCart className='h-8 w-8' />
                </span>
                <div>
                  <p>{countCart}</p>
                </div>
              </div>
            </Link>
          )}

          <div>
            {user?.name ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link to={'login'}>Login</Link>
            )}
          </div>
        </div>
      </div>
    </header> */
  )
}

export default Header
