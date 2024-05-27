import UserImg from '../components/UserImg'
import { LuUserCircle2 } from 'react-icons/lu'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ROLE from '../common/role'
import { useAuthContext } from '../hooks/useAuthContext'

const AdminPanel = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user } = useAuthContext()

  useEffect(() => {
    if (user) {
      if (user.role !== ROLE.ADMIN) {
        navigate('/')
      } else {
        navigate(pathname)
      }
    }
  }, [user, navigate])

  return (
    <div className='flex lg:shadow justify-center min-h-[calc(100vh-111px)]'>
      <div className='bg-pink-600 w-full h-10'>
        <Link
          to={'all-users'}
          className={`px-2 py-1 hover:bg-pink-600 rounded-xl ${pathname.includes('all-users') && 'underline'}`}
        >
          All users
        </Link>
        <Link
          to={'all-products'}
          className={`px-2 py-1 hover:bg-pink-600 rounded-xl ${pathname.includes('all-products') && 'underline'}`}
        >
          All products
        </Link>
        <Link
          to={'sold-products'}
          className={`px-2 py-1 hover:bg-pink-600 rounded-xl ${pathname.includes('sold-products') && 'underline'}`}
        >
          Orders
        </Link>
      </div>
    </div>
  )
}

export default AdminPanel

{
  /* <div className='hidden w-full min-h-[calc(100vh-120px)] lg:flex bg-white rounded-md'>
<aside className='min-h-full w-full max-w-48'>
  <div className='flex flex-col h-40 items-center justify-center '>
    <div className='h-20 w-20 text-3xl'>
      {user ? (
        <UserImg textSize='3xl' userName={user.name} />
      ) : (
        <LuUserCircle2 className='text-5xl' />
      )}
    </div>
    <p className='text-lg font-semibold pt-2'>{user?.name}</p>
    <p className='text-sm'>{user?.role}</p>
  </div>

  <div>
    <nav className='grid p-4'>
      <Link
        to={'all-users'}
        className='px-2 py-1 hover:bg-pink-600 rounded-xl'
      >
        All users
      </Link>
      <Link
        to={'all-products'}
        className='px-2 py-1 hover:bg-pink-600 rounded-xl'
      >
        All products
      </Link>
      <Link
        to={'sold-products'}
        className='px-2 py-1 hover:bg-pink-600 rounded-xl'
      >
        Sold products
      </Link>
    </nav>
  </div>
</aside>
<main className='w-full h-full p-2'>
  <Outlet />
</main>
</div> */
}
