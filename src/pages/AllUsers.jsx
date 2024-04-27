import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAllUsersAction } from '../features/allUsersSlice'

const AllUsers = () => {
  const allUsers = useSelector(state => state.allUsers)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!allUsers.length) dispatch(initializeAllUsersAction())
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
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user, index) => {
            return (
              <tr key={user.id}>
                <td>{index}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>{user?.createdAt}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AllUsers
