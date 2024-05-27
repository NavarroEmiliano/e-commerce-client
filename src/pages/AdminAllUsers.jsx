import { useState } from 'react'
import moment from 'moment'
import { MdModeEdit } from 'react-icons/md'
import ChangeUserRole from '../components/ChangeUserRole'
import Loading from '../components/Loading'
import { useQuery } from '@tanstack/react-query'
import usersService from '../services/usersService'
import { useAuthContext } from '../hooks/useAuthContext'

const AdminAllUsers = () => {
  const { user } = useAuthContext()

  const { isPending, data } = useQuery({
    queryKey: ['allUsers'],
    queryFn: usersService.getAllUsers,
    staleTime: Infinity,
    enabled: !!user,
  })

  const [showUpdateRole, setShowUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({})

  const handleShowEdit = (user) => {
    setShowUpdateRole((prev) => !prev)
    setUpdateUserDetails(user?.name ? { ...user } : {})
  }

  if (isPending) {
    return (
      <div className='flex items-center justify-center min-h-[calc(100vh-140px)]'>
        <Loading />
      </div>
    )
  }

  return (
    <div>
      {data?.data?.map((user) => (
        <div key={user.id} className='flex gap-4 p-4 border-2 rounded-2xl m-4'>
          <div className='flex items-center justify-center h-14 w-14 min-h-14 min-w-14 border-2 rounded-full'>
            Img
          </div>
          <div className='flex justify-between w-full'>
            <div>
              <p className='text-xl font-medium'>{user.name}</p>
              <p className='text-gray-500'>Role: {user.role}</p>
              <p>{user.email}</p>
              <p>{moment(user?.createdAt).format('LL')}</p>
            </div>
            <button
              onClick={() => handleShowEdit(user)}
              className='bg-green-200 h-8 w-8 p-2 rounded-full hover:bg-green-500'
            >
              <MdModeEdit />
            </button>
          </div>
        </div>
      ))}
      {/* <table className='w-full userTable'>
        <thead className='text-gray-500'>
          <tr>
            <th>N</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((user, index) => {
            return (
              <tr key={user?.id}>
                <td>{index}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>{moment(user?.createdAt).format('LL')}</td>
                <td>
                  <button
                    onClick={() => handleShowEdit(user)}
                    className='bg-green-200 p-2 rounded-full hover:bg-green-500'
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table> */}
      {showUpdateRole ? (
        <ChangeUserRole onClose={handleShowEdit} user={updateUserDetails} />
      ) : (
        ''
      )}
    </div>
  )
}

export default AdminAllUsers
