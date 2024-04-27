import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAllUsersAction } from '../features/allUsersSlice'
import moment from 'moment'
import { MdModeEdit } from 'react-icons/md'
import ChangeUserRole from '../components/ChangeUserRole'

const AllUsers = () => {
  const allUsers = useSelector(state => state.allUsers)
  const [showUpdateRole, setShowUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({})

  const dispatch = useDispatch()

  const handleShowEdit = user => {
    setShowUpdateRole(prev => !prev)
    setUpdateUserDetails(user.name ? { ...user } : {})
  }

  useEffect(() => {
    if(!allUsers.length) dispatch(initializeAllUsersAction())
  }, [])


  return (
    <div>
      <table className='w-full userTable'>
        <thead>
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
          {allUsers?.map((user, index) => {
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
