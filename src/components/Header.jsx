import { FiSearch } from 'react-icons/fi'
import { LuShoppingCart } from 'react-icons/lu'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import UserImg from './UserImg'
import { useState } from 'react'
import ROLE from '../common/role'

import { useQuery } from '@tanstack/react-query'
import cartService from '../services/cartService'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { user } = useAuthContext()
  const { search } = useLocation()
  const [searchInput, setSearchInput] = useState(search.split('=')[1])
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { logout } = useLogout()

  const { data } = useQuery({
    queryKey: ['countCart'],
    queryFn: cartService.countCart,
    enabled: !!user,
    retry: false,
    refetchOnWindowFocus: false,
  })

  const handleLogout = () => {
    logout()
  }

  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

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
    <header className='h-16 shadow-sm bg-white'>
      <div className='h-full w-[95%] sm:w-[80%] mx-auto flex items-center justify-between'>
        <Link to='/'>
          <div className='text-sm md:text-xl mr-2 text-center'>Pulse-Tech</div>
        </Link>

        {pathname !== '/admin-panel/all-products' && (
          <div className='flex items-center w-full border h-9 justify-between max-w-sm rounded-full focus-within:shadow '>
            <input
              onChange={handleSearch}
              type='text'
              name='searchInput'
              value={searchInput}
              placeholder='Search product here...'
              className='w-full h-full outline-none rounded-l-full pl-4 text-ellipsis'
            />
            <div className='text-white text-lg min-w-[50px] h-9 bg-red-600 flex items-center justify-center rounded-r-full'>
              <FiSearch />
            </div>
          </div>
        )}

        <div className='flex items-center justify-between ml-2 gap-2 sm:gap-6 md:gap-8'>
          <div
            onClick={handleMenu}
            className='relative flex justify-center cursor-pointer'
          >
            {user && (
              <div className='flex text-4xl items-center justify-center h-8 w-8'>
                <UserImg textSize='sm' userName={user?.name} />
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
                  <p className='text-xs text-white'>{data?.data}</p>
                </div>
              </div>
            </Link>
          )}

          <div>
            {user?.name ? (
              <button
                onClick={handleLogout}
                className='flex items-center justify-center px-2 py-1 text-white bg-red-600 rounded-full  hover:bg-red-700'
              >
                Logout
              </button>
            ) : (
              <Link
                to={'login'}
                className='flex items-center justify-center px-2 py-1 text-white bg-red-600 rounded-full  hover:bg-red-700'
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
