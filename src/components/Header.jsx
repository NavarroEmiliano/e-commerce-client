import { LuShoppingCart } from 'react-icons/lu'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import UserImg from './UserImg'
import { useState } from 'react'
import ROLE from '../common/role'

import { useQuery } from '@tanstack/react-query'
import cartService from '../services/cartService'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import SearchBar from './SearchBar'
import productsService from '../services/productsService'

import { IoMenu } from 'react-icons/io5'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
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
    logout()
  }

  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleChangeSelect = (e) => {
    if (e.target.value === 'categories') {
      return navigate('/')
    }
    navigate(`product-category/${e.target.value}`)
  }

  return (
    /* Mobile */

    <header className='flex items-center h-14 p-4 0 bg-pink-600 justify-between w-full'>
      <div className='text-xl'>
        <IoMenu />
      </div>
      <SearchBar />

      {user ? (
        <Link to='cart'>
          <div className='relative'>
            <span className='text-xl'>
              <LuShoppingCart />
            </span>
            <div className='absolute h-4 text-center -top-2 -right-2 bg-pink-600 text-white'>
              <p>{countCart > 9 ? '+9' : countCart}</p>
            </div>
          </div>
        </Link>
      ) : (
        <Link to={'login'}>Login</Link>
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
