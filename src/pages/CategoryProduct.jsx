import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
  const products = useSelector((state) => state.products)
  const { categoryName } = useParams()
  const defaultCategory = categoryName || ''
  const [selectCategory, setSelectCategory] = useState({
    [defaultCategory]: true,
  })

  const [sortByPrice, setSortByPrice] = useState('')

  const categoriesArr = products.map((product) => product.category)
  const categoriesSet = [...new Set(categoriesArr)]

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target
    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      }
    })
  }

  const filteredProducts = [...products]
    .sort((a, b) => {
      if (sortByPrice === 'ASC') {
        return a.price - b.price
      } else if (sortByPrice === 'DESC') {
        return b.price - a.price
      }
      return 0
    })
    .filter((product) => selectCategory[product.category])

  const handleSortByChange = (e) => {
    setSortByPrice(e.target.value)
  }

  return (
    <div className='container mx-auto px-4'>
      {/* Desktop version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/* Left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
          {/* Sort by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border border-slate-300'>
              Sort by
            </h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input
                  onChange={handleSortByChange}
                  type='radio'
                  name='sortBy'
                  value='ASC'
                />
                <label htmlFor=''>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input
                  onChange={handleSortByChange}
                  type='radio'
                  name='sortBy'
                  value='DESC'
                />
                <label htmlFor=''>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border border-slate-300'>
              Category
            </h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {categoriesSet.map((category) => {
                return (
                  <div key={category} className='flex items-center gap-3'>
                    <input
                      type='checkbox'
                      name='category'
                      id={category}
                      value={category}
                      checked={selectCategory[category] || false}
                      onChange={handleSelectCategory}
                    />
                    <label className='capitalize' htmlFor={category}>
                      {category}
                    </label>
                  </div>
                )
              })}
            </form>
          </div>
        </div>
        <div>
          {filteredProducts.map((product) => (
            <div className='capitalize border mb-2' key={product.title}>
              <p>{product.title}</p>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct
