import { useState } from 'react'
import displayUsdCurrency from '../helpers/displayCurrency'
import { useQuery } from '@tanstack/react-query'
import Loading from '../components/Loading'
import purchaseService from '../services/purchaseService'
import moment from 'moment'

const AdminSoldProducts = () => {
  const { isPending, data: allPurchases } = useQuery({
    queryKey: ['allPurchases'],
    queryFn: purchaseService.getAllPurchases,
    staleTime: Infinity,
  })

  const [sortOrder, setSortOrder] = useState('asc') // Estado para el orden de las ventas

  if (isPending) {
    return (
      <div className='flex items-center justify-center min-h-[calc(100vh-140px)]'>
        <Loading />
      </div>
    )
  }

  const handleSortOrderChange = () => {
    if (sortOrder === 'asc') {
      setSortOrder('desc')
    } else {
      setSortOrder('asc')
    }
  }

  const sortedPurchases = [...allPurchases].sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
  })

  return (
    <div>
      <div className='flex px-4 text-gray-500 mt-4'>
        <button onClick={handleSortOrderChange} className='font-semibold mr-2'>
          Date
        </button>
        <div className='h-4 w-4'>
          <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
        </div>
      </div>

      {sortedPurchases?.map((purch) => (
        <div
          key={purch.id}
          className='flex flex-col p-4 border-2 border-pink-200 rounded-2xl m-4'
        >
          <div className='flex items-center gap-2 text-gray-500 text-xs'>
            <p>Product Id:</p>
            <p>{purch.id}</p>
          </div>
          <div className='flex gap-2'>
            <p className='text-gray-500'>Status:</p>
            <p className='text-orange-600 font-bold'>{purch.status}</p>
          </div>
          <div className='flex gap-2'>
            <p className='text-gray-500'>Date:</p>
            <p>{moment(purch?.createdAt).format('LL')}</p>
          </div>
          <div className='flex gap-2'>
            <p className='text-gray-500'>Customer:</p>
            <p>{purch?.userId?.name}</p>
          </div>
          <div className='flex gap-2'>
            <p className='text-gray-500'>Email:</p>
            <p className='line-clamp-1'>{purch?.userId?.email}</p>
          </div>
          <div className='flex gap-2'>
            <p className='text-gray-500'>Items:</p>
            <p className='line-clamp-1'>{purch?.items.length}</p>
          </div>
          <div className='flex gap-2'>
            <p className='text-gray-500'>Total:</p>
            <p className='line-clamp-1'>
              {displayUsdCurrency(purch?.totalPrice)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminSoldProducts
