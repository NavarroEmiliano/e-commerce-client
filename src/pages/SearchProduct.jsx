import { useLocation } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useQuery } from '@tanstack/react-query'
import productsService from '../services/productsService'

const SearchProduct = () => {
  const { search } = useLocation()

  const { isPending, data: productsFound } = useQuery({
    queryKey: ['foundProducts'],
    queryFn: () => productsService.searchProducts(search),
    enabled: !!search,
  })

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <div className='container fl mx-auto'>
      <div className='flex flex-col justify-center items-center'>
        <div className='w-full text-center my-2'>
          <p className='text-lg'>Products found:</p>
        </div>
        <div className='flex w-full flex-wrap gap-8 justify-center md:justify-start items-center'>
          {productsFound?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchProduct
