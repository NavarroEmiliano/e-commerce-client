import Logo from './Logo'
import { FiSearch } from 'react-icons/fi'
import { LuUserCircle2 } from 'react-icons/lu'
import { LuShoppingCart } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UserImg from './UserImg'
import { logoutUserAction } from '../features/userSlice'
import { toast } from 'react-toastify'
import { useState } from 'react'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUserAction())
    toast.success('Logged out successfully')
  }

  const handleMenu = () => {
    setShowMenu(!showMenu)
  }


  return (
    <header className='sticky h-16 shadow-md bg-white'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div>
          <Link to={'/'}>
            <Logo width={50} height={50} />
          </Link>
        </div>

        <div className='hidden  lg:flex items-center w-full h-9 justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input
            type='text'
            placeholder='Search product here...'
            className='w-full h-full outline-none rounded-l-full pl-2'
          />
          <div className='text-lg min-w-[50px] h-9 bg-red-600 flex items-center justify-center rounded-r-full'>
            <FiSearch />
          </div>
        </div>

        <div className='flex items-center justify-center h-8 gap-7 '>
          <div onClick={handleMenu} className=' cursor-pointer'>
            <div className='flex text-4xl items-center justify-center h-8 w-8'>
              {user ? <UserImg textSize='sm' /> : <LuUserCircle2 />}
            </div>

            {user && showMenu && (
              <div className='absolute bg-white group-hover:block  top-12 h-fit p-2 shadow-lg rounded-md'>
                <nav>
                  <Link
                    to={'admin-panel'}
                    onClick={handleMenu}
                    className='whitespace-nowrap hover:bg-slate-100 '
                  >
                    Admin Panel
                  </Link>
                </nav>
              </div>
            )}
          </div>

          <div className='text-3xl cursor-pointer relative'>
            <span>
              <LuShoppingCart />
            </span>
            <div className='bg-red-600 w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-2'>
              <p className='text-xs text-white'>0</p>
            </div>
          </div>

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
