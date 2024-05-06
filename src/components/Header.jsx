import { FiSearch } from 'react-icons/fi'
import { LuShoppingCart } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import UserImg from './UserImg'
import { logoutUserAction } from '../features/userSlice'
import { useEffect, useState } from 'react'
import ROLE from '../common/role'
import {
  cleanUserCart,
  initializeUserCartAction,
} from '../features/userCartSlice'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { search } = useLocation()

  const [searchInput, setSearchInput] = useState(search.split('=')[1])

  const user = useSelector((state) => state.user)
  const countCart = useSelector((state) => state.userCart.length)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    setShowMenu(!showMenu)
    dispatch(logoutUserAction())
    dispatch(cleanUserCart())
  }

  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

  useEffect(() => {
    if (!countCart && user) dispatch(initializeUserCartAction())
  }, [countCart, user])

  const handleSearch = (e) => {
    const { value } = e.target
    setSearchInput(value)
    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate('/')
    }
  }

  return (
    <header className='sticky h-16 shadow-md bg-white'>
      <div className='h-full  w-[80%] mx-auto flex items-center justify-between'>
        <Link to='/'>
          <div className='text-xl'>E-commerce</div>
        </Link>

        <div className='hidden lg:flex items-center w-full border h-9 justify-between max-w-sm rounded-full focus-within:shadow '>
          <input
            onChange={handleSearch}
            type='text'
            name='searchInput'
            value={searchInput}
            placeholder='Search product here...'
            className='w-full h-full outline-none rounded-l-full pl-4'
          />
          <div className='text-lg min-w-[50px] h-9 bg-red-600 flex items-center justify-center rounded-r-full'>
            <FiSearch />
          </div>
        </div>

        <div className='flex items-center justify-center h-8 gap-7'>
          <div
            onClick={handleMenu}
            className='relative flex justify-center cursor-pointer'
          >
            {user && (
              <div className='flex text-4xl items-center justify-center h-8 w-8'>
                <UserImg textSize='sm' />
              </div>
            )}

            {showMenu && (
              <div className='absolute bg-white group-hover:block top-12 h-fit p-2 shadow-lg rounded-md'>
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to='admin-panel/all-products'
                      onClick={handleMenu}
                      className='whitespace-nowrap hover:bg-slate-100 '
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user && (
            <Link to='cart'>
              <div className='text-3xl cursor-pointer relative'>
                <span>
                  <LuShoppingCart className='h-8 w-8' />
                </span>
                <div className='bg-red-600 w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-2'>
                  <p className='text-xs text-white'>{countCart}</p>
                </div>
              </div>
            </Link>
          )}

          <div className='flex h-full'>
            {user?.name ? (
              <button
                onClick={handleLogout}
                className='flex  items-center justify-center px-2 text-white bg-red-600 rounded-full  hover:bg-red-700'
              >
                Logout
              </button>
            ) : (
              <Link
                to={'login'}
                className='text-white h-full bg-red-600 rounded-full px-3 py-1 hover:bg-red-700'
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
