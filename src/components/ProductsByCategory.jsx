import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import oneProductByCategory from '../helpers/oneProductByCategory'
import Skeleton from 'react-loading-skeleton'

import Carousel from 'react-multi-carousel'
import responsiveCarrouselConfig from '../helpers/responsiveCarouselConfig'

const ProductsByCategory = () => {
  const products = useSelector((state) => state.products)
  const [loading, setLoading] = useState(false)
  const [productsByCategory, setProductsByCategory] = useState([])

  const skeletonArray = new Array(7).fill(null)

  useEffect(() => {
    const productsByCategory = oneProductByCategory(products)
    setProductsByCategory(productsByCategory)
    if (productsByCategory.length) setLoading(false)
  }, [products])

  const responsive = responsiveCarrouselConfig()

  return (
    <div className='container mx-auto  my-6'>
      {loading ? (
        <div className='flex justify-between gap-6 '>
          {skeletonArray.map((_, index) => {
            return (
              <div key={index}>
                <div className='w-20 h-20 rounded-full my-2'>
                  <div className='w-full h-full '>
                    <Skeleton circle className='w-full h-full' />
                  </div>
                </div>
                <p>
                  <Skeleton />
                </p>
              </div>
            )
          })}
        </div>
      ) : (
        <Carousel
          showDots={true}
          responsive={responsive}
          infinite={true}
          customTransition='all .5'
          transitionDuration={500}
          removeArrowOnDeviceType={['tablet', 'mobile']}
        >
          {productsByCategory.map((product) => {
            return (
              <Link
                to={`product-category/${product?.category}`}
                className='flex flex-col my-6 h-full cursor-pointer'
                key={product.id}
              >
                <div className='w-20 h-20 mx-auto border rounded-full overflow-hidden '>
                  <img
                    className='w-full h-full object-cover'
                    src={product.images[0]}
                    alt={product.category}
                  />
                </div>
                <p className='text-center capitalize'>{product?.category}</p>
              </Link>
            )
          })}
        </Carousel>
      )}
    </div>
  )
}

export default ProductsByCategory
