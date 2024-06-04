import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ROLE from '../common/role'
import { useAuthContext } from '../hooks/useAuthContext'

const AdminPanel = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user, isLoading } = useAuthContext()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        if (user.role !== ROLE.ADMIN) {
          navigate('/')
        }
      } else {
        navigate('/')
      }
    }
  }, [user, navigate, isLoading])

  return (
    <div className='flex flex-col justify-start min-h-[calc(100vh-111px)]'>
      <div className='flex px-4 sm:px-20 lg:px-32 items-center h-8 gap-4 bg-pink-600 w-full'>
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
      <main className='w-full h-full sm:px-20'>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminPanel
