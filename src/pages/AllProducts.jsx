import { useQuery } from '@tanstack/react-query'
import productsService from '../services/productsService'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
  const { isPending, data: allProducts } = useQuery({
    queryKey: ['allProducts'],
    queryFn: productsService.getAllProducts,
  })

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {allProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default AllProducts
