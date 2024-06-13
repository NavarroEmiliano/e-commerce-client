/* eslint-disable react/prop-types */
import { useState } from 'react'
import ROLE from '../common/role'
import { IoCloseOutline } from 'react-icons/io5'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import usersService from '../services/usersService'

const ChangeUserRole = ({ onClose, user }) => {
  const queryClient = useQueryClient()

  const updateUserMutation = useMutation({
    mutationFn: usersService.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries('allUsers')
    },
  })

  const [userRole, setUserRole] = useState(user.role)

  const handleRole = (e) => {
    setUserRole(e.target.value)
  }

  const handleUpdate = () => {
    const updatedUser = { ...user, role: userRole }
    onClose()
    updateUserMutation.mutate(updatedUser)
  }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-black bg-opacity-45'>
      <div className='bg-white shadow-md p-4 w-full max-w-sm rounded-lg mx-4'>
        <button onClick={onClose} className='block ml-auto text-2xl'>
          <IoCloseOutline />
        </button>

        <div className='flex flex-col gap-4'>
          <h1 className='pb text-lx font-medium text-xl'>Change User Role</h1>
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
          className='w-fit mx-auto block border p-2 rounded-xl mt-4 bg-pink-600 text-white hover:bg-pink-700'
        >
          Change Role
        </button>
      </div>
    </div>
  )
}

export default ChangeUserRole
