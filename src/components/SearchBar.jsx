/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5'
import { useQueryClient } from '@tanstack/react-query'

const SearchBar = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [searchInput, setSearchInput] = useState('')

  const handleChange = (e) => {
    const { value } = e.target
    setSearchInput(value)
    if (!value) {
      queryClient.removeQueries(['foundProducts'])
      navigate('/')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`./search?q=${searchInput}`)
  }

  const handleCleanInput = (e) => {
    e.preventDefault()
    setSearchInput('')
    queryClient.removeQueries(['foundProducts'])
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className='flex'>
      <input
        onChange={handleChange}
        name='searchInput'
        value={searchInput}
        placeholder='Search product here...'
        className='rounded-l-full p-1 pl-2 outline-none'
        autoComplete='off'
      />

      <div className='flex items-center w-6 text-xl bg-white'>
        {searchInput && (
          <div onClick={handleCleanInput}>
            <IoCloseOutline className='hover:scale-125  duration-75' />
          </div>
        )}
      </div>

      <button className='flex items-center bg-white rounded-r-full pr-2 '>
        <IoSearchOutline className='hover:scale-125  duration-75' />
      </button>
    </form>
  )
}

export default SearchBar
