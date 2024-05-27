/* eslint-disable react/prop-types */
import productsService from '../services/productsService'
import Carousel from 'react-multi-carousel'
import ProductCard from './ProductCard'
import { useQuery } from '@tanstack/react-query'
import Skeleton from 'react-loading-skeleton'

const RecommendedProductCarrousel = ({ category, heading }) => {
  const { isPending, data } = useQuery({
    queryKey: [category],
    queryFn: () => productsService.getProductsByCategory(category),
    staleTime: Infinity,
    enabled: !!category,
  })

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  }

  const loadingCart = new Array(2).fill(null)

  if (isPending) {
    return (
      <div>
        <div className='h-7 w-48 mb-2'>
          <Skeleton className='h-full' />
        </div>
        <div className='flex justify-between'>
          {loadingCart.map((el, index) => (
            <div key={index} className='h-80 w-[200px] mb-2'>
              <Skeleton className='h-full' />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='mx-auto py-4 '>
      <h2 className='text-2xl mx-1 font-semibold pb-4'>{heading}</h2>

      {!isPending && (
        <div>
          <Carousel
            showDots={true}
            responsive={responsive}
            removeArrowOnDeviceType={['tablet', 'mobile']}
          >
            {data?.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  isPending={isPending}
                />
              )
            })}
          </Carousel>
        </div>
      )}
    </div>
  )
}

export default RecommendedProductCarrousel
