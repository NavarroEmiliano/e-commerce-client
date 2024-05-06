/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import calculateDiscountedPrice from '../helpers/calculateDiscountedPrice'
import displayUsdCurrency from '../helpers/displayCurrency'
import { addToCartAction } from '../features/userCartSlice'
import { useDispatch } from 'react-redux'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (productId) => {
    dispatch(addToCartAction(productId))
  }

  return (
    <div key={product.id} className='mb-8 w-full max-w-[200px]'>
      {product ? (
        <div className='h-80 rounded-xl p-2 border shadow flex flex-col justify-between'>
          <div className='flex items-center justify-center h-44 min-h-44  overflow-hidden rounded-lg'>
            <Link to={`/product/${product.id}`}>
              <div className='w-full max-h-44'>
                <img
                  src={product?.images[0]}
                  alt={product?.title}
                  className='w-full h-auto object-scale-down max-h-36 hover:scale-110 duration-75'
                />
              </div>
            </Link>
          </div>
          <div className='flex flex-col justify-around h-36'>
            <h2 className='font-bold truncate'>{product?.title}</h2>
            <div className='flex justify-between'>
              <p>
                {displayUsdCurrency(
                  calculateDiscountedPrice(
                    product?.price,
                    product?.discountPercentage,
                  ),
                )}
              </p>
              <p className='text-gray-500 line-through ml-auto'>
                {displayUsdCurrency(product?.price)}
              </p>
            </div>
            <p className='text-gray-500 ml-auto'>
              {Math.ceil(product?.discountPercentage)}% OFF
            </p>
            <button
              onClick={() => handleAddToCart(product.id)}
              className='bg-red-600 w-full rounded-xl py-1 text-white hover:bg-red-800'
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ProductCard
