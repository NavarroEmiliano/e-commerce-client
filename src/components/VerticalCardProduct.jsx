/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import productsService from '../services/productsService'
import Carousel from 'react-multi-carousel'
import ProductCard from './ProductCard'

const VerticalCardProduct = ({ category, heading }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await productsService.getProductsByCategory(category)
      if (response.status === 'OK') setProducts(response.data)
    }

    fetchProducts()
  }, [category])

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

  return (
    <div className='mx-auto py-4 '>
      <h2 className='text-2xl font-semibold pb-4'>{heading}</h2>
      <div>
        <Carousel
          showDots={true}
          responsive={responsive}
          removeArrowOnDeviceType={['tablet', 'mobile']}
        >
          {products?.map((product) => {
            return <ProductCard key={product.id} product={product} />
          })}
        </Carousel>
      </div>
    </div>
  )
}

export default VerticalCardProduct
