/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5'

const SearchBar = ({ handleClick, showInput }) => {
  const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState('')

  const handleChange = (e) => {
    const { value } = e.target
    setSearchInput(value)
    if (!value) navigate('/')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`./search?q=${searchInput}`)
  }

  const handleCleanInput = (e) => {
    e.preventDefault()
    setSearchInput('')
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className='flex'>
      <input
        onChange={handleChange}
        type='text'
        name='searchInput'
        value={searchInput}
        placeholder='Search product here...'
        className='rounded-l-full p-1 pl-2 outline-none'
      />

      <div className='flex w-6 text-xl bg-white'>
        {searchInput && (
          <button onClick={handleCleanInput}>
            <IoCloseOutline />
          </button>
        )}
      </div>

      <div className='flex items-center bg-white rounded-r-full pr-2'>
        <button className='hidden'>Search</button>
        <div className='text-xl'>
          <IoSearchOutline />
        </div>
      </div>
    </form>
  )
}

export default SearchBar
