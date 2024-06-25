/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import cartService from '../services/cartService'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import displayUsdCurrency from '../helpers/displayCurrency'
import calculateDiscountedPrice from '../helpers/calculateDiscountedPrice'
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci'

const ProductCardCart = ({ product }) => {
  const queryClient = useQueryClient()
  const deleteUserCartItemMutation = useMutation({
    mutationFn: cartService.deleteUserCartItem,
    onSuccess: (data, productId) => {
      toast.success(data)
      const userCart = queryClient.getQueryData(['userCart'])
      queryClient.setQueryData(['countCart'], (oldData) => oldData - 1)
      queryClient.setQueryData(
        ['userCart'],
        userCart.filter((product) => product.id !== productId),
      )
    },
    onError: (error) => {
      toast.error(error.response.data.data)
    },
  })

  const editUserCartItemMutation = useMutation({
    mutationFn: cartService.updateItemUserCart,
    onSuccess: (data) => {
      const userCart = queryClient.getQueryData(['userCart'])
      queryClient.setQueryData(
        ['userCart'],
        userCart.map((prod) => (prod.id !== data.id ? prod : data)),
      )
    },
    onError: (error) => {
      toast.error(error.response.data.data)
    },
  })

  const increaseQuantity = (id, quantity, product) => {
    if (quantity >= product.stock)
      return toast.error(
        'Unable to add more items than available in stock at the moment.',
      )
    const obj = {
      id,
      quantity: quantity + 1,
    }
    editUserCartItemMutation.mutate(obj)
  }

  const decreaseQuantity = (id, quantity) => {
    const obj = {
      id,
      quantity: quantity - 1,
    }
    if (obj.quantity <= 0) {
      return deleteUserCartItemMutation.mutate(obj.id)
    }

    editUserCartItemMutation.mutate(obj)
  }

  const deleteCartProduct = (productId) => {
    deleteUserCartItemMutation.mutate(productId)
  }

  return (
    <div
      key={product.id}
      className='w-full h-40 sm:h-32 mb-2 border-2 border-pink-200 rounded-2xl grid grid-cols-[128px,1fr] overflow-hidden'
    >
      <Link
        to={`/product/${product?.productId?.id}`}
        className='h-full p-1 w-32 cursor-pointer overflow-hidden'
      >
        <img
          className='w-full h-full max-w-32 object-scale-down hover:scale-110 duration-100'
          src={product?.productId?.images[0]}
          alt={product?.productId?.title}
        />
      </Link>
      <div className='flex flex-col justify-around p-2 relative'>
        <div
          onClick={() => deleteCartProduct(product.id)}
          className='hover:scale-125 duration-150 cursor-pointer text-3xl absolute right-0 top-0 text-red-600 rounded-full p-1'
        >
          <MdDelete />
        </div>
        <h2 className='text-lg font-bold lg:text-2xl capitalize text-ellipsis line-clamp-1'>
          {product?.productId?.title}
        </h2>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col sm:flex-row sm:gap-2'>
            <strong>
              {displayUsdCurrency(
                calculateDiscountedPrice(
                  product?.productId?.price,
                  product?.productId?.discountPercentage,
                ),
              )}
            </strong>
            <p className='text-gray-500'>Unit price</p>
          </div>

          <div className='flex flex-col sm:flex-row sm:gap-2'>
            <strong>
              {displayUsdCurrency(
                calculateDiscountedPrice(
                  product?.productId?.price,
                  product?.productId?.discountPercentage,
                ) * product?.quantity,
              )}
            </strong>
            <p className='text-gray-500'>Subtotal</p>
          </div>
        </div>
        <div className='flex justify-between items-center mt-2'>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => decreaseQuantity(product.id, product.quantity)}
              className='w-8 h-8 text-red-600 hover:scale-110 duration-150'
            >
              <CiSquareMinus className='w-full h-full' />
            </button>
            <span className='font-bold'>{product.quantity}</span>
            <button
              onClick={() =>
                increaseQuantity(
                  product.id,
                  product.quantity,
                  product.productId,
                )
              }
              className='w-8 h-8 flex text-red-600 hover:scale-110 duration-150'
            >
              <CiSquarePlus className='w-full h-full ' />
            </button>
          </div>
          <p className='text-gray-500 text-end'>
            <strong>{product?.productId?.stock} </strong>left in stock
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductCardCart
