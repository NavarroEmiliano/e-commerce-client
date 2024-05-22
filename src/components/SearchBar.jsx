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
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type='text'
        name='searchInput'
        value={searchInput}
        placeholder='Search product here...'
      />

      <div>
        {searchInput && (
          <button onClick={handleCleanInput}>
            <IoCloseOutline />
          </button>
        )}
      </div>

      <div>
        <button>Search</button>
      </div>
    </form>
  )
}

export default SearchBar
