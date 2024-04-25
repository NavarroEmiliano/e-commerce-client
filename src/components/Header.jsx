import Logo from './Logo'
import { FiSearch } from 'react-icons/fi'
import { LuUserCircle2 } from 'react-icons/lu'
import { LuShoppingCart } from 'react-icons/lu'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='h-16 shadow-md bg-white'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between   '>
        <div >
          <Link to={'/'}>
            <Logo width={50} height={50} />
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input
            type='text'
            placeholder='Search product here...'
            className='w-full outline-none'
          />
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full'>
            <FiSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>
          <div className='text-3xl cursor-pointer'>
            <LuUserCircle2 />
          </div>

          <div className='text-3xl cursor-pointer relative'>
            <span>
              <LuShoppingCart />
            </span>
            <div className='bg-red-600 w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-2'>
              <p className='text-xs text-white'>0</p>
            </div>
          </div>

          <div>
            <Link to={'login'} className='text-white bg-red-600 rounded-full px-3 py-1 hover:bg-red-700'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
