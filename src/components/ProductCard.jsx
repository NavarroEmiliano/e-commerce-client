/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import calculateDiscountedPrice from '../helpers/calculateDiscountedPrice'
import displayUsdCurrency from '../helpers/displayCurrency'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import cartService from '../services/cartService'
import { toast } from 'react-toastify'
import { useAuthContext } from '../hooks/useAuthContext'

const ProductCard = ({ product }) => {
  const queryClient = useQueryClient()
  const { user } = useAuthContext()

  const addToCartMutation = useMutation({
    mutationFn: cartService.addToCart,
    onSuccess: () => {
      toast.success('Product added to cart')
      queryClient.setQueryData(['countCart'], (oldData) => oldData + 1)
    },
    onError: (error) => {
      toast.error(error.response.data.data)
    },
  })

  const handleAddToCart = (productId) => {
    if (!user)
      return toast.error(
        'To add products to your cart, please log in or create an account',
      )
    addToCartMutation.mutate(productId)
  }

  return (
    <div className='mb-8 mx-auto w-full max-w-[180px]'>
      <div className='h-80 rounded-xl p-2 border shadow flex flex-col justify-between'>
        <div className='flex items-center justify-center h-44 min-h-44 overflow-hidden rounded-lg'>
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
            className='bg-pink-600 w-full rounded-xl py-1 text-white hover:bg-pink-800'
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
