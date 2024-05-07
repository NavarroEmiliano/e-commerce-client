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
    <div className='container mx-auto'>
      <div className='flex flex-wrap gap-8  justify-center md:justify-start items-center my-4'>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default SearchProduct
