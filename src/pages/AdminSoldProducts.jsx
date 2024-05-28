import { useState } from 'react'
import displayUsdCurrency from '../helpers/displayCurrency'
import { useQuery } from '@tanstack/react-query'
import productsService from '../services/productsService'
import Loading from '../components/Loading'
import purchaseService from '../services/purchaseService'
import moment from 'moment'

const AdminSoldProducts = () => {
  const { isPending, data: allPurchases } = useQuery({
    queryKey: ['allPurchases'],
    queryFn: purchaseService.getAllPurchases,
    staleTime: Infinity,
  })

  /*   const [productId, setProductId] = useState('')
  const [searchInput, setSearchInput] = useState('') */

  /*   const filteredProducts =
    !isPending &&
    allProducts?.filter(
      (product) =>
        product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchInput.toLowerCase()) ||
        product.category.toLowerCase().includes(searchInput.toLowerCase()),
    )
 */
  /*   const handleSearch = (e) => {
    const { value } = e.target
    setSearchInput(value)
  } */

  if (isPending) {
    return (
      <div className='flex items-center justify-center min-h-[calc(100vh-140px)]'>
        <Loading />
      </div>
    )
  }

  console.log(allPurchases)

  return (
    <div>
      {allPurchases?.map((purch) => (
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
