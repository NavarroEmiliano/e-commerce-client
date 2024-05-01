/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import productsService from '../services/productsService'
import displayUsdCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'

const HorizontalCardProduct = ({ category, heading }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchProducts = async () => {
      const response = await productsService.getProductsByCategory(category)
      if (response.status === 'OK') setProducts(response.data)
    }

    fetchProducts()
  }, [category])


  return (
    <div className=' mx-auto py-4 overflow-x-scroll hidden md:block'>
      <h2 className='text-2xl font-semibold pb-4'>{heading}</h2>
      <div className='flex gap-4 '>
        {products?.map(product => {
          return (
            <Link to={`/product/${product.id}`} key={product.id}>
            <div
              
              className='w-full max-w-[280px] md:min-w-[320px] h-36 bg-white rounded-sm shadow flex'
            >
              <div className='bg-slate-700 h-full p-2 min-w-[120px] md:min-w-[145px]'>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className='object-scale-down h-full'
                />
              </div>
              <div>
                <h2>{product?.title}</h2>
                <div>
                  <p className='text-gray-500 line-through'>{displayUsdCurrency(product.price) }</p>
                  <p >{displayUsdCurrency(product.price * (1 - Math.ceil(product.discountPercentage) /100))}</p>
                  <p className='text-gray-500' >{Math.ceil(product.discountPercentage)}% OFF</p>
                </div>
                <button className='bg-red-600 '>Add to Cart</button>
              </div>
            </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default HorizontalCardProduct
