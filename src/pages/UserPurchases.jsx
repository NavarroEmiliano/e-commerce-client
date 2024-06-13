import { useQuery } from '@tanstack/react-query'
import React from 'react'
import purchaseService from '../services/purchaseService'
import { useAuthContext } from '../hooks/useAuthContext'
import moment from 'moment/moment'
import displayUsdCurrency from '../helpers/displayCurrency'
import Loading from '../components/Loading'

const UserPurchases = () => {
  const { user } = useAuthContext()

  const { isLoading, data: userPurchases } = useQuery({
    queryKey: ['userPurchases'],
    queryFn: purchaseService.getUserPurchases,
    enabled: !!user,
    retry: false,
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return (
      <div className='grid place-items-center w-full min-h-[calc(100vh-112px)]'>
        <Loading />
      </div>
    )
  }

  return (
    <div
      className='m-4 sm:mx-20
    lg:mx-32'
    >
      {userPurchases
        ? userPurchases.map((purchase) => (
            <div
              key={purchase.id}
              className='flex flex-col border-2 border-pink-200 rounded-2xl mb-4'
            >
              <div className='p-2 px-4 border-b flex justify-between'>
                <p>{moment(purchase.createdAt).format('LL')}</p>
                <p className='text-lime-600 capitalize'>
                  {purchase.status.toLowerCase()}
                </p>
                <div className='flex gap-2 items-center'>
                  <p className='text-gray-500'>Total</p>
                  <p>{displayUsdCurrency(purchase.totalPrice)}</p>
                </div>
              </div>
              <div>
                {purchase.items.map((item) => (
                  <div
                    key={item._id}
                    className='flex items-center border-b h-32 p-4'
                  >
                    <div className='w-24 h-24 mr-4'>
                      <img
                        src={item.productId.images[0]}
                        alt=''
                        className='w-full h-full object-scale-down border-2 rounded-xl'
                      />
                    </div>
                    <div>
                      <p>{item.productId.title}</p>
                      <div className='flex gap-1'>
                        <p>{item.quantity}</p>
                        <p className='text-gray-500'>
                          {item.quantity === 1 ? 'unit' : 'units'}
                        </p>
                      </div>
                      <div className='flex gap-1'>
                        <p className='text-gray-500'>Unit price</p>
                        <p>{displayUsdCurrency(item.unitPrice)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        : ''}
    </div>
  )
}

export default UserPurchases
