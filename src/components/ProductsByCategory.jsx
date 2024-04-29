import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeCategoriesAction } from '../features/categorySlice'

const ProductsByCategory = () => {
  const categories = useSelector(state => state.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!categories.length) dispatch(initializeCategoriesAction())
  }, [])

  return (
    <div className='container  mx-auto p-4'>
      <div className='flex items-center gap-4 justify-between overflow-x-scroll scrollbar-hide '>
        {categories.map((product, index) => {
          return (
            <div className='flex flex-col m-4 h-full ' key={product.id}>
              <div className='w-24 h-24 rounded-full overflow-hidden '>
                <img
                  className='w-full h-full object-cover'
                  src={product.images[0]}
                  alt={product.category}
                />
              </div>
              <p className='text-center'>{product?.category}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductsByCategory
