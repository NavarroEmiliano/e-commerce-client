import { useQuery } from '@tanstack/react-query'
import productsService from '../services/productsService'
import ProductCard from '../components/ProductCard'
import Skeleton from 'react-loading-skeleton'

const AllProducts = () => {
  const { isPending, data: allProducts } = useQuery({
    queryKey: ['allProducts'],
    queryFn: productsService.getAllProducts,
  })

  const categorieSkeletons = new Array(8).fill(null)


  return (
    <div className='grid grid-cols-2 xl:px-20 md:grid-cols-3 md:px-12 lg:grid-cols-4 xl:grid-cols-5 py-4 place-items-center min-h-[calc(100vh-109px)]'>
      {isPending
        ? categorieSkeletons.map((_el, index) => {
            return (
              <div key={index} className='h-72 mb-4 w-full max-w-[180px] rounded-lg'>
                <Skeleton className='h-full w-full' />
              </div>  
            )
          })
        : allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
  )
}

export default AllProducts
