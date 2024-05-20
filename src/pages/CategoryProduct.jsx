import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useQuery } from '@tanstack/react-query'
import productsService from '../services/productsService'

const CategoryProduct = () => {
  const { categoryName } = useParams()
  const defaultCategory = categoryName || ''
  const [selectCategory, setSelectCategory] = useState({
    [defaultCategory]: true,
  })

  const [sortByPrice, setSortByPrice] = useState('')
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [showFilterButton, setShowFilterButton] = useState(false)

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const { data: productsByCategory } = useQuery({
    queryKey: ['productsByCategory'],
    queryFn: productsService.getProductsByCategory(categoryName),
    enabled: !!categoryName,
  })

  const { data: allCategories } = useQuery({
    queryKey: ['allCategories'],
    queryFn: productsService.getAllCategories,
  })

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target
    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      }
    })
  }

  console.log(productsByCategory)

  const filteredProducts = [...productsByCategory]
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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (windowWidth > 640) {
      setShowFilterMenu(true)
      setShowFilterButton(false)
    } else {
      setShowFilterMenu(false)
      setShowFilterButton(true)
    }
  }, [windowWidth])

  return (
    <div className='flex mx-auto my-8 px-4 relative'>
      {/* Desktop version */}
      {showFilterButton && (
        <button
          className='md:hidden absolute -top-8 left-0 font-medium text-red-600 border-2 border-red-600 mt-[2px] px-2 rounded-full'
          onClick={() => setShowFilterMenu(!showFilterMenu)}
        >
          Filter
        </button>
      )}

      <div className='flex w-full '>
        {/* Left side */}
        <div
          className={`${showFilterMenu && showFilterButton ? 'md:block absolute left-0 top-0' : showFilterMenu ? 'block' : 'hidden'} min-w-48 bg-white  p-2 min-h-[calc(100vh-120px)] shadow rounded overflow-y-hidden`}
        >
          {/* Sort by */}
          <div className='w-full md:block'>
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
        <div className='flex w-full flex-wrap justify-around gap-6'>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct
