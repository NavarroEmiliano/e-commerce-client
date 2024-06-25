import displayUsdCurrency from '../helpers/displayCurrency'
import Skeleton from 'react-loading-skeleton'
import calculateDiscountedPrice from '../helpers/calculateDiscountedPrice'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import cartService from '../services/cartService'
import { useAuthContext } from '../hooks/useAuthContext'
import PaypalCheckoutButton from '../components/PaypalCheckoutButton'
import { useEffect } from 'react'
import ProductCardCart from '../components/ProductCardCart'

const Cart = () => {
  const { user } = useAuthContext()
  const { isPending, data: userCart } = useQuery({
    queryKey: ['userCart'],
    queryFn: cartService.getUserCart,
    enabled: !!user,
    refetchOnWindowFocus: false,
  })

  const queryClient = useQueryClient()

  const loadingCart = new Array(5).fill(null)

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

  const cartIsEmpty = userCart !== undefined && userCart.length === 0

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['userCart'] })
    }
  }, [])

  return (
    <div className='w-full mx-auto p-4 sm:px-14 md:px-20 lg:px-32'>
      <div className='font-bold text-xl mb-2'>Shopping Cart</div>
      {cartIsEmpty && (
        <div className='w-full text-center'>Your shopping cart is empty</div>
      )}

      <div className='flex flex-col lg:flex-row lg:items-start items-center w-full gap-2'>
        {/*  View Product  */}
        <div className='w-full'>
          {isPending
            ? loadingCart.map((el, index) => (
                <div key={index} className='h-32 mb-2'>
                  <Skeleton className='h-full' />
                </div>
              ))
            : userCart?.map((el) => <ProductCardCart key={el?.id} product={el}/>)}
        </div>

        {/* Total product */}

        {totalQuantity ? (
          <div className='sticky top-0 mt-5 lg:mt-0 w-full lg:max-w-sm'>
            {isPending ? (
              <div className='h-36 mb-2'>
                <Skeleton className='h-full' />
              </div>
            ) : (
              <div className='overflow-hidden bg-white border-2 rounded-2xl border-pink-200  flex flex-col justify-center items-center gap-2 pb-2'>
                <h2 className='text-white w-full bg-pink-600 px-4 py-1'>
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
                    <div className='border-2 border-pink-200 rounded-2xl p-2 text-sm'>
                      <p>Test account: pulse-tech-user@personal.example.com</p>
                      <p>Password: PaypalUser1</p>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Cart
