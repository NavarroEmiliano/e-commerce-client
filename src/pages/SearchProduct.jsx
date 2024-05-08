import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const SearchProduct = () => {
  const products = useSelector((state) => state.products)
  const { search } = useLocation()

  const searchValue = search.split('=')[1]

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.category.toLowerCase().includes(searchValue.toLowerCase()),
  )

  return (
    <div className='container fl mx-auto'>
      <div className='flex flex-col justify-center items-center'>
        <div className='w-full text-center my-2'>
          <p className='text-lg'>Products found: {filteredProducts.length}</p>
        </div>
        <div className='flex w-full flex-wrap gap-8 justify-center md:justify-start items-center'>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchProduct
