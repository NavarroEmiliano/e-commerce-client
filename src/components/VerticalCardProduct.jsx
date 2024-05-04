/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import productsService from '../services/productsService'
import displayUsdCurrency from '../helpers/displayCurrency'

const VerticalCardProduct = ({ category, heading }) => {
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
    <div className='max-h-56 mx-auto py-4 overflow-x-scroll'>
      <h2 className='text-2xl font-semibold pb-4'>{heading}</h2>
      <div className='flex justify-between h-full items-center gap-4'>
        {products?.map((product) => {
          return (
            <div
              key={product.id}
              className='w-full max-w-[150px] h-full bg-white rounded-sm shadow flex flex-col'
            >
              <div className='bg-slate-700 h-full p-2 '>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className=' h-full'
                />
              </div>
              <div>
                <h2>{product?.title}</h2>
                <div>
                  <p className='text-gray-500 line-through'>
                    {displayUsdCurrency(product.price)}
                  </p>
                  <p>
                    {displayUsdCurrency(
                      product.price *
                        (1 - Math.ceil(product.discountPercentage) / 100),
                    )}
                  </p>
                  <p className='text-gray-500'>
                    {Math.ceil(product.discountPercentage)}% OFF
                  </p>
                </div>
                <button className='bg-red-600 '>Add to Cart</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VerticalCardProduct
