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
    <div className='flex flex-col justify-start min-h-[calc(100vh-111px)]'>
      <div className='flex px-4 items-center h-8 gap-4 bg-pink-600 w-full'>
        <Link
          to={'all-users'}
          className={`${pathname.includes('all-users') ? 'border-b-2 font-semibold text-white' : 'text-pink-800'}`}
        >
          All users
        </Link>
        <Link
          to={'all-products'}
          className={`${pathname.includes('all-products') ? 'border-b-2 font-semibold text-white' : 'text-pink-800'}`}
        >
          All products
        </Link>
        <Link
          to={'sold-products'}
          className={`${pathname.includes('sold-products') ? 'border-b-2 font-semibold text-white' : 'text-pink-800'}`}
        >
          Orders
        </Link>
      </div>
      <main className='w-full h-full'>
        <Outlet />
      </main>
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
