import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoCloseOutline } from 'react-icons/io5'

const SearchBar = () => {
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
    <form
      onSubmit={handleSubmit}
      className='flex border rounded-full h-8 justify-center items-center'
    >
      <input
        onChange={handleChange}
        type='text'
        name='searchInput'
        value={searchInput}
        placeholder='Search product here...'
        className='outline-none rounded-l-full pl-4 text-ellipsis'
      />

      <div className='h-full w-6 flex items-center justify-center text-xl text-slate-500'>
        {searchInput && (
          <button onClick={handleCleanInput}>
            <IoCloseOutline />
          </button>
        )}
      </div>

      <div className='text-white h-8 px-2 bg-red-600 flex items-center justify-center rounded-r-full border border-red-600'>
        <button className='flex items-center '>Search</button>
      </div>
    </form>
  )
}

export default SearchBar
