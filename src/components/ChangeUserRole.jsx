/* eslint-disable react/prop-types */
import { useState } from 'react'
import ROLE from '../common/role'
import { IoCloseOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { updateUserAction } from '../features/allUsersSlice'

const ChangeUserRole = ({ onClose, user }) => {
  const [userRole, setUserRole] = useState(user.role)
  const dispatch = useDispatch()

  const handleRole = (e) => {
    setUserRole(e.target.value)
  }

  const handleUpdate = () => {
    const updatedUser = { ...user, role: userRole }
    onClose()
    dispatch(updateUserAction(updatedUser))
  }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-black bg-opacity-45'>
      <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm rounded-lg'>
        <button onClick={onClose} className='block ml-auto text-2xl'>
          <IoCloseOutline />
        </button>

        <div className='flex flex-col gap-4'>
          <h1 className='pb text-lx font-medium'>Change User Role</h1>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <div className='flex'>
            <label htmlFor='role'>Role: </label>
            <select
              className='text-sm border px-4 rounded-lg ml-2'
              id='role'
              value={userRole}
              onChange={handleRole}
            >
              {Object.values(ROLE).map((el) => {
                return (
                  <option key={el} value={el}>
                    {el}
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        <button
          onClick={handleUpdate}
          className='w-fit mx-auto block border p-2 rounded-full mt-4 bg-red-600 text-white hover:bg-red-700'
        >
          Change Role
        </button>
      </div>
    </div>
  )
}

export default ChangeUserRole
