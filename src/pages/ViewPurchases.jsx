import { useQuery } from '@tanstack/react-query'
import React from 'react'
import purchaseService from '../services/purchaseService'
import { useAuthContext } from '../hooks/useAuthContext'
import moment from 'moment/moment'

const ViewPurchases = () => {
  const { user } = useAuthContext()

  const { data: userPurchases } = useQuery({
    queryKey: ['userPurchases'],
    queryFn: purchaseService.getUserPurchases,
    enabled: !!user,
    retry: false,
    refetchOnWindowFocus: false,
  })

  console.log(userPurchases)
  return (
    <div>
      {userPurchases
        ? userPurchases.map((purchase) => (
            <div key={purchase.id} className='w-full bg-slate-600'>
              <div>{moment(purchase.createdAt).format('LL')}</div>
              <div>
                {purchase.items.map((item) => (
                  <div key={item._id} className='h-48'>
                    <div>
                      <img
                        src={item.productId.images[0]}
                        alt=''
                        className='w-36'
                      />
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

export default ViewPurchases
