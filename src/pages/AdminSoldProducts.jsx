import { useState } from 'react'
import displayUsdCurrency from '../helpers/displayCurrency'
import { useQuery } from '@tanstack/react-query'
import productsService from '../services/productsService'
import Loading from '../components/Loading'

const AdminSoldProducts = () => {
  const { isPending, data: allProducts } = useQuery({
    queryKey: ['allProducts'],
    queryFn: productsService.getAllProducts,
    staleTime: Infinity,
  })

  const [productId, setProductId] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const filteredProducts =
    !isPending &&
    allProducts?.filter(
      (product) =>
        product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchInput.toLowerCase()) ||
        product.category.toLowerCase().includes(searchInput.toLowerCase()),
    )

  const handleSearch = (e) => {
    const { value } = e.target
    setSearchInput(value)
  }

  if (isPending) {
    return (
      <div className='flex items-center justify-center min-h-[calc(100vh-140px)]'>
        <Loading />
      </div>
    )
  }

  return (
    <div className='border rounded-md'>
      <div className='flex justify-between items-center py-2 px-4 border-b'>
        <h2 className='font-bold text-lg'>Sold products</h2>
        <input
          onChange={handleSearch}
          type='text'
          name='searchInput'
          value={searchInput}
          placeholder='Search product here...'
          className='outline-none rounded-full pl-2 p-1 text-ellipsis border'
        />
      </div>

      <div className='overflow-y-auto h-[calc(100vh-190px)]'>
        <table className='w-full productTable'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.map((product) => {
              return (
                <tr key={product?.id}>
                  <td className='flex items-center justify-center'>
                    <img
                      src={product?.images[0]}
                      alt={product.description}
                      width={70}
                      height={70}
                    />
                  </td>
                  <td>{product?.title}</td>
                  <td>{displayUsdCurrency(product?.price)}</td>
                  <td>{product?.stock}</td>
                  <td>{product?.category}</td>
                  <td>{product?.brand}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminSoldProducts
