import { useSelector } from 'react-redux'
import UserImg from '../components/UserImg'
import { LuUserCircle2 } from 'react-icons/lu'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ROLE from '../common/role'

const AdminPanel = () => {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(()=>{
    if(user?.role !== ROLE.ADMIN) navigate('/')
  },[user])

  return (
    <div className='hidden  min-h-[calc(100vh-120px)] lg:flex  bg-white'>
      <aside className=' min-h-full w-full max-w-80 shadow-md '>
        <div className='flex flex-col h-40 items-center justify-center '>
          <div className='h-20 w-20 text-3xl'>
            {user ? <UserImg /> : <LuUserCircle2 className='text-5xl' />}
          </div>
          <p className='text-lg font-semibold pt-2'>{user?.name}</p>
          <p className='text-sm'>{user?.role}</p>
        </div>

        <div>
          <nav className='grid p-4'>
            <Link to={'all-users'} className='px-2 py-1 hover:bg-slate-200'>
              All users
            </Link>
            <Link to={'all-products'} className='px-2 py-1 hover:bg-slate-200'>
              All products
            </Link>
          </nav>
        </div>
      </aside>
      <main className='w-full h-full p-2'>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminPanel
