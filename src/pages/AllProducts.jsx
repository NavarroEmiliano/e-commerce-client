import { useQuery } from '@tanstack/react-query'
import productsService from '../services/productsService'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'

const AllProducts = () => {
  const { isPending, data: allProducts } = useQuery({
    queryKey: ['allProducts'],
    queryFn: productsService.getAllProducts,
  })

  if (isPending) {
    return (
      <div className='flex items-center justify-center min-h-[calc(100vh-140px)]'>
        <Loading />
      </div>
    )
  }
  return (
    <div className='grid grid-cols-2  md:grid-cols-3 md:px-12 lg:grid-cols-4 py-4'>
      {allProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default AllProducts
