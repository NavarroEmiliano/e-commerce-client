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
    <div className='w-full mx-auto md:px-20'>
        <div className='relative top-2 flex mx-auto w-fit border-2 rounded-2xl gap-2 items-center justify-center px-6 py-1'>
          <p >{productsFound?.length}</p>
          <p>Products found</p>
        </div>
        <div className='grid p-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center flex-wrap gap-8 min-h-[calc(100vh-144px)]'>
          {productsFound?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
    </div>
  )
}

export default SearchProduct
