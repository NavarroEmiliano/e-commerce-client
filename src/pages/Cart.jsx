import displayUsdCurrency from '../helpers/displayCurrency'

import { MdDelete } from 'react-icons/md'
import Skeleton from 'react-loading-skeleton'

import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import calculateDiscountedPrice from '../helpers/calculateDiscountedPrice'
import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import cartService from '../services/cartService'
import { useAuthContext } from '../hooks/useAuthContext'
import PaypalCheckoutButton from '../components/PaypalCheckoutButton'

const Cart = () => {
  const { user } = useAuthContext()
  const { isPending, data: userCart } = useQuery({
    queryKey: ['userCart'],
    queryFn: cartService.getUserCart,
    enabled: !!user,
    refetchOnWindowFocus: false,
  })

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

  const totalQuantity = userCart?.reduce(
    (prev, curr) => prev + curr.quantity,
    0,
  )
  const totalPrice = userCart?.reduce(
    (prev, curr) => prev + curr?.productId?.price * curr.quantity,
    0,
  )

  const totalPriceWithDiscount = userCart?.reduce(
    (prev, curr) =>
      prev +
      calculateDiscountedPrice(
        curr.productId?.price,
        curr.productId?.discountPercentage,
      ) *
        curr.quantity,
    0,
  )

  return (
    <div className='container mx-auto p-4 min-h-[calc(100vh-112px)]'>
      <div className='font-bold text-xl mb-2'>Shopping Cart</div>
      <div className='flex flex-col lg:flex-row lg:items-start items-center w-full gap-2'>
        {/*  View Product  */}
        <div className='w-full'>
          {isPending
            ? loadingCart.map((el, index) => (
                <div key={index} className='h-32 mb-2'>
                  <Skeleton className='h-full' />
                </div>
              ))
            : userCart?.map((el) => (
                <div
                  key={el.id}
                  className='w-full h-40 sm:h-32 shadow mb-2 border border-slate-300 rounded-lg grid grid-cols-[128px,1fr] overflow-hidden'
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
                  <div className='flex flex-col justify-around p-2 relative'>
                    <div
                      onClick={() => deleteCartProduct(el.id)}
                      className='hover:scale-125 duration-150 cursor-pointer text-3xl absolute right-0 top-0 text-red-600 rounded-full p-1'
                    >
                      <MdDelete />
                    </div>
                    <h2 className='text-lg font-bold lg:text-2xl capitalize text-ellipsis line-clamp-1'>
                      {el?.productId?.title}
                    </h2>
                    <div className='flex items-center justify-between'>
                      <div className='flex flex-col sm:flex-row sm:gap-2'>
                        <strong>
                          {displayUsdCurrency(
                            calculateDiscountedPrice(
                              el?.productId?.price,
                              el?.productId?.discountPercentage,
                            ),
                          )}
                        </strong>
                        <p className='text-gray-500'>Unit price</p>
                      </div>

                      <div className='flex flex-col sm:flex-row sm:gap-2'>
                        <strong>
                          {displayUsdCurrency(
                            calculateDiscountedPrice(
                              el?.productId?.price,
                              el?.productId?.discountPercentage,
                            ) * el?.quantity,
                          )}
                        </strong>
                        <p className='text-gray-500'>Subtotal</p>
                      </div>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                      <div className='flex items-center gap-3'>
                        <button
                          onClick={() => decreaseQuantity(el.id, el.quantity)}
                          className='w-8 h-8 text-red-600 hover:scale-110 duration-150'
                        >
                          <CiSquareMinus className='w-full h-full' />
                        </button>
                        <span className='font-bold'>{el.quantity}</span>
                        <button
                          onClick={() =>
                            increaseQuantity(el.id, el.quantity, el.productId)
                          }
                          className='w-8 h-8 flex text-red-600 hover:scale-110 duration-150'
                        >
                          <CiSquarePlus className='w-full h-full ' />
                        </button>
                      </div>
                      <p className='text-gray-500'>
                        <strong>{el?.productId.stock} </strong>left in stock
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Total product */}

        {totalQuantity ? (
          <div className='mt-5 lg:mt-0 w-full lg:max-w-sm '>
            {isPending ? (
              <div className='h-36 mb-2'>
                <Skeleton className='h-full' />
              </div>
            ) : (
              <div className='bg-white shadow rounded-md border-slate-300 flex flex-col justify-center items-center gap-2 pb-2'>
                <h2 className='text-white w-full bg-pink-600 px-4 py-1 rounded-t-lg'>
                  Summary
                </h2>
                <div className='flex w-full items-center justify-between px-4 gap-2 font-medium text-lg '>
                  <p>Quantity</p>
                  <p>{totalQuantity}</p>
                </div>
                <div className='flex w-full items-center justify-between px-4 gap-2 font-medium text-lg '>
                  <strong>Total Price with Discounts:</strong>
                  <p>{displayUsdCurrency(totalPriceWithDiscount)}</p>
                </div>
                <div className='flex text-red-600 w-full items-center justify-between px-4 gap-2 font-medium'>
                  <p>Total Price without Discounts:</p>
                  <p>{displayUsdCurrency(totalPrice)}</p>
                </div>
                <div className='flex w-full items-center justify-between px-4 gap-2 font-medium  '>
                  <p>Savings:</p>
                  <p>
                    {displayUsdCurrency(totalPrice - totalPriceWithDiscount)}
                  </p>
                </div>
                {userCart.length ? (
                  <div className='relative z-0'>
                    <PaypalCheckoutButton products={userCart} />
                  </div>
                ) : (
                  ''
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <p>Your shopping cart is empty</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
