import { useState } from 'react'
import moment from 'moment'
import { MdModeEdit } from 'react-icons/md'
import ChangeUserRole from '../components/ChangeUserRole'
import Loading from '../components/Loading'
import { useQuery } from '@tanstack/react-query'
import usersService from '../services/usersService'
import { useAuthContext } from '../hooks/useAuthContext'

const AllUsers = () => {
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
      <table className='w-full userTable'>
        <thead className='bg-gray-500 text-white'>
          <tr>
            <th>Sr.</th>
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
      </table>
      {showUpdateRole && (
        <ChangeUserRole onClose={handleShowEdit} user={updateUserDetails} />
      )}
    </div>
  )
}

export default AllUsers
