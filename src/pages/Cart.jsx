import { useDispatch, useSelector } from 'react-redux'
import displayUsdCurrency from '../helpers/displayCurrency'
import {
  deleteCartItemAction,
  updateQuantityCartItemAction,
} from '../features/userCartSlice'
import { MdDelete } from 'react-icons/md'

const Cart = () => {
  const userCart = useSelector((state) => state.userCart)
  const dispatch = useDispatch()

  const loadingCart = new Array(5).fill(null)

  const increaseQuantity = (id, quantity) => {
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
  }

  const deleteCartProduct = (id) => {
    dispatch(deleteCartItemAction(id))
  }

  const totalQuantity = userCart.reduce((prev, curr) => prev + curr.quantity, 0)

  const totalPrice = userCart.reduce(
    (prev, curr) => prev + curr?.productId?.price * curr.quantity,
    0,
  )

  return (
    <div className='container mx-auto'>
      <div className='text-center text-lg my-3 w-full'>
        {userCart.length === 0 && <p className='bg-white py-5'>Loading...</p>}
      </div>

      <div className='flex w-full gap-10'>
        {/* View Product */}
        <div className='w-full'>
          {userCart.length === 0
            ? loadingCart.map((el) => (
                <div
                  key={el + 'Add To Cart Loading'}
                  className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded-lg'
                >
                  Holis
                </div>
              ))
            : userCart?.map((el) => (
                <div
                  key={el.id}
                  className='w-full bg-slate-200 h-32 my-2 border border-slate-300 rounded-lg grid grid-cols-[128px,1fr] overflow-hidden'
                >
                  <div className='h-32 w-32'>
                    <img
                      className='w-full h-full object-cover'
                      src={el?.productId?.images[0]}
                      alt={el?.productId?.title}
                    />
                  </div>
                  <div className='p-2 relative'>
                    <div
                      onClick={() => deleteCartProduct(el.id)}
                      className='hover:bg-black cursor-pointer text-3xl absolute right-0 text-red-600 rounded-full p-2'
                    >
                      <MdDelete />
                    </div>
                    <h2 className='text-lg lg:text-2xl text-ellipsis line-clamp-1 '>
                      {el?.productId?.title}
                    </h2>
                    <p className='capitalize'>{el?.productId?.category}</p>
                    <div className='flex items-center justify-between '>
                      <p>{displayUsdCurrency(el?.productId?.price)}</p>
                      <p>
                        {displayUsdCurrency(
                          el?.productId?.price * el?.quantity,
                        )}
                      </p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <button
                        onClick={() => decreaseQuantity(el.id, el.quantity)}
                        className='mx-2 border border-red-600 rounded w-6 h-6 flex items-center justify-center '
                      >
                        -
                      </button>
                      <span>{el.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(el.id, el.quantity)}
                        className='mx-2 border border-red-600 rounded w-6 h-6 flex items-center justify-center'
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Total product */}
        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
          {userCart?.length === 0 ? (
            <div className='h-36 bg-slate-200'>Total</div>
          ) : (
            <div className='h-36 bg-slate-200'>
              <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
              <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg '>
                <p>Quantity</p>
                <p>{totalQuantity}</p>
              </div>
              <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg '>
                <p>Total Price</p>
                <p>{displayUsdCurrency(totalPrice)}</p>
              </div>

              <button className='border-2 border-blue-600 p-2 w-full rounded'>
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
