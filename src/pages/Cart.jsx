import { useDispatch, useSelector } from 'react-redux'
import displayUsdCurrency from '../helpers/displayCurrency'
import {
  deleteCartItemAction,
  updateQuantityCartItemAction,
} from '../features/userCartSlice'
import { MdDelete } from 'react-icons/md'
import Skeleton from 'react-loading-skeleton'

import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import calculateDiscountedPrice from '../helpers/calculateDiscountedPrice'
import { toast } from 'react-toastify'

const Cart = () => {
  const userCart = useSelector((state) => state.userCart)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const loadingCart = new Array(5).fill(null)

  const increaseQuantity = (id, quantity, product) => {
    if (quantity >= product.stock)
      return toast.error(
        'Unable to add more items than available in stock at the moment.',
      )
    const obj = {
      id,
      quantity: quantity + 1,
    }
    dispatch(updateQuantityCartItemAction(obj))
  }

  const decreaseQuantity = (id, quantity) => {
    const obj = {
      id,
      quantity: quantity - 1,
    }
    dispatch(updateQuantityCartItemAction(obj))
    if (obj.quantity <= 0) return toast.success('Product removed from cart.')
  }

  const deleteCartProduct = (id) => {
    dispatch(deleteCartItemAction(id))
  }

  const totalQuantity = userCart.reduce((prev, curr) => prev + curr.quantity, 0)

  const totalPrice = userCart.reduce(
    (prev, curr) => prev + curr?.productId?.price * curr.quantity,
    0,
  )

  const totalPriceWithDiscount = userCart.reduce(
    (prev, curr) =>
      prev +
      calculateDiscountedPrice(
        curr.productId?.price,
        curr.productId?.discountPercentage,
      ) *
        curr.quantity,
    0,
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='container mx-auto py-4'>
      <div className='flex flex-col-reverse lg:flex-row lg:items-start items-center w-full gap-10'>
        {/* View Product */}
        <div className='w-full'>
          {loading
            ? loadingCart.map((el, index) => (
                <div key={index} className='h-32 mb-2'>
                  <Skeleton className='h-full' />
                </div>
              ))
            : userCart?.map((el) => (
                <div
                  key={el.id}
                  className='w-full bg-white h-40 sm:h-32 shadow mb-2 border border-slate-300 rounded-lg grid grid-cols-[128px,1fr] overflow-hidden'
                >
                  <Link
                    to={`/product/${el.productId.id}`}
                    className='h-full p-1 w-32 cursor-pointer overflow-hidden'
                  >
                    <img
                      className='w-full h-full max-w-32 object-scale-down hover:scale-110 duration-100'
                      src={el?.productId?.images[0]}
                      alt={el?.productId?.title}
                    />
                  </Link>
                  <div className='p-2 relative'>
                    <div
                      onClick={() => deleteCartProduct(el.id)}
                      className='hover:scale-125 duration-150 cursor-pointer text-3xl absolute right-0 top-0 text-red-600 rounded-full p-1'
                    >
                      <MdDelete />
                    </div>
                    <h2 className='text-lg lg:text-2xl capitalize text-ellipsis line-clamp-1 '>
                      {el?.productId?.title}
                    </h2>
                    <p className='capitalize'>{el?.productId?.category}</p>
                    <div className='flex items-center justify-between '>
                      <div className='flex flex-col sm:flex-row sm:gap-2'>
                        <p>
                          {displayUsdCurrency(
                            calculateDiscountedPrice(
                              el?.productId?.price,
                              el?.productId?.discountPercentage,
                            ),
                          )}
                        </p>
                        <p className='text-gray-500'>Unit price</p>
                      </div>

                      <div className='flex flex-col sm:flex-row sm:gap-2'>
                        <p>
                          {displayUsdCurrency(
                            calculateDiscountedPrice(
                              el?.productId?.price,
                              el?.productId?.discountPercentage,
                            ) * el?.quantity,
                          )}
                        </p>
                        <p className='text-gray-500'>Subtotal</p>
                      </div>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                      <div className='flex items-center gap-3'>
                        <button
                          onClick={() => decreaseQuantity(el.id, el.quantity)}
                          className='w-6 h-6 text-red-600 hover:scale-110 duration-150'
                        >
                          <CiSquareMinus className='w-full h-full' />
                        </button>
                        <span>{el.quantity}</span>
                        <button
                          onClick={() =>
                            increaseQuantity(el.id, el.quantity, el.productId)
                          }
                          className='w-6 h-6 flex text-red-600 hover:scale-110 duration-150'
                        >
                          <CiSquarePlus className='w-full h-full ' />
                        </button>
                      </div>
                      <p className='text-gray-500'>
                        Stock: {el?.productId.stock}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Total product */}
        <div className='mt-5 lg:mt-0 w-full lg:max-w-sm '>
          {loading ? (
            <div className='h-36 mb-2'>
              <Skeleton className='h-full' />
            </div>
          ) : (
            <div className='bg-white shadow rounded-md border-slate-300 flex flex-col justify-center items-center gap-2 pb-2'>
              <h2 className='text-white w-full bg-red-600 px-4 py-1 rounded-t-lg'>
                Summary
              </h2>
              <div className='flex w-full items-center justify-between px-4 gap-2 font-medium text-lg '>
                <p>Quantity</p>
                <p>{totalQuantity}</p>
              </div>
              <div className='flex w-full items-center justify-between px-4 gap-2 font-medium text-lg '>
                <p>Total Price with Discounts:</p>
                <p>{displayUsdCurrency(totalPriceWithDiscount)}</p>
              </div>
              <div className='flex text-red-600 w-full items-center justify-between px-4 gap-2 font-medium'>
                <p>Total Price without Discounts:</p>
                <p>{displayUsdCurrency(totalPrice)}</p>
              </div>
              <div className='flex w-full items-center justify-between px-4 gap-2 font-medium  '>
                <p>Savings:</p>
                <p>{displayUsdCurrency(totalPrice - totalPriceWithDiscount)}</p>
              </div>

              <button className='border-2 border-blue-600 py-2 w-[95%] rounded hover:bg-blue-600 hover:text-white'>
                Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
