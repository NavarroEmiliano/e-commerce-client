import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useQuery } from '@tanstack/react-query'
import productsService from '../services/productsService'
import Skeleton from 'react-loading-skeleton'

const CategoryProduct = () => {
  const { categoryName } = useParams()

  const { isPending, data } = useQuery({
    queryKey: [categoryName],
    queryFn: () => productsService.getProductsByCategory(categoryName),
    enabled: !!categoryName,
  })

  const categorieSkeletons = new Array(4).fill(null)
  const onlyOneProduct = data?.length === 1

  return (
    <div
      className={`grid py-4 md:px-16 lg:px-24 ${onlyOneProduct ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'} w-full place-items-center min-h-[calc(100vh-109px)]`}
    >
      {isPending
        ? categorieSkeletons.map((_el, index) => {
            return (
              <div key={index} className='h-72 w-full max-w-[180px] rounded-lg'>
                <Skeleton className='h-full w-full' />
              </div>
            )
          })
        : data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
  )
}

export default CategoryProduct
