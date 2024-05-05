import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

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

  return <div>{<p>Search Results: {filteredProducts?.length}</p>}</div>
}

export default SearchProduct
