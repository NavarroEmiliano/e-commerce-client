import { useSelector } from 'react-redux'
import UserImg from '../components/UserImg'
import { LuUserCircle2 } from 'react-icons/lu'

const AdminPanel = () => {
  const user = useSelector(state => state.user)

  return (
    <div className='flex min-h-[calc(100vh-120px)] bg-slate-600'>
      <aside className='min-h-100vh w-full max-w-60 bg-white'>
        <div className='h-20 cursor-pointer relative flex justify-center bg-black'>
          {user ? <UserImg  size={50} textSize='2xl'/> : <LuUserCircle2 />}
        </div>
      </aside>
      <main className=''>main</main>
    </div>
  )
}

export default AdminPanel
