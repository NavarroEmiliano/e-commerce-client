import { useLocation } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useQuery } from '@tanstack/react-query'
import productsService from '../services/productsService'
import Loading from '../components/Loading'

const SearchProduct = () => {
  const { search } = useLocation()

  const { isPending, data: productsFound } = useQuery({
    queryKey: ['foundProducts', search],
    queryFn: () => productsService.searchProducts(search),
    enabled: !!search,
    refetchOnWindowFocus: false,
  })

  if (isPending) {
    return (
      <div className='flex items-center justify-center min-h-[calc(100vh-140px)]'>
        <Loading />
      </div>
    )
  }

  return (
    <div className='container mx-auto'>
      <div className='flex sm:px-16 lg:px-24 xl:px-32 flex-col justify-center items-center w-full'>
        <div className='flex gap-2 items-center w-full my-2 px-6'>
          <p>{productsFound?.length}</p>
          <p>Products found</p>
        </div>
        <div className='flex flex-wrap  gap-8 min-h-[calc(100vh-160px)] items-center justify-center'>
          {productsFound?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchProduct
