import { useQuery } from '@tanstack/react-query'
import React from 'react'
import purchaseService from '../services/purchaseService'
import { useAuthContext } from '../hooks/useAuthContext'

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
  return <div>ViewPurchases</div>
}

export default ViewPurchases
