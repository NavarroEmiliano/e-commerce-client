/* eslint-disable react/prop-types */
import productsService from '../services/productsService'
import Carousel from 'react-multi-carousel'
import ProductCard from './ProductCard'
import { useQuery } from '@tanstack/react-query'

const RecommendedProductCarrousel = ({ category, heading }) => {
  const { isPending, data } = useQuery({
    queryKey: [category],
    queryFn: () => productsService.getProductsByCategory(category),
    staleTime: Infinity,
  })

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  }

  if (isPending) {
    return <span>Loading...</span>
  }

  return (
    <div className='mx-auto py-4 '>
      <h2 className='text-2xl font-semibold pb-4'>{heading}</h2>
      <div>
        <Carousel
          showDots={true}
          responsive={responsive}
          removeArrowOnDeviceType={['tablet', 'mobile']}
        >
          {data?.data?.map((product) => {
            return <ProductCard key={product.id} product={product} />
          })}
        </Carousel>
      </div>
    </div>
  )
}

export default RecommendedProductCarrousel
