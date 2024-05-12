import { useState } from 'react'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import AdminEditProduct from '../components/AdminEditProduct'
import AdminUploadProduct from '../components/AdminUploadProduct'
import displayUsdCurrency from '../helpers/displayCurrency'
import { useQuery } from '@tanstack/react-query'
import productsService from '../services/productsService'
import Loading from '../components/Loading'

const AllProducts = () => {
  const { isPending, data: allProducts } = useQuery({
    queryKey: ['allProducts'],
    queryFn: productsService.getAllProducts,
    staleTime: Infinity,
  })

  const [showUploadProduct, setShowUploadProduct] = useState(false)
  const [showEditProduct, setShowEditProduct] = useState(false)
  const [productId, setProductId] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const handleUploadProduct = () => {
    setShowUploadProduct((prev) => !prev)
  }

  const handleEditProduct = (id = '') => {
    setShowEditProduct((prev) => !prev)
    setProductId(id)
  }

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
        <h2 className='font-bold text-lg'>All products</h2>
        <input
          onChange={handleSearch}
          type='text'
          name='searchInput'
          value={searchInput}
          placeholder='Search product here...'
          className='outline-none rounded-full pl-2 p-1 text-ellipsis border'
        />
        <button
          onClick={handleUploadProduct}
          className='border-2 border-red-600 rounded-full px-2 py-1 hover:bg-red-600 hover:text-white'
        >
          Upload Product
        </button>
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
              <th>Actions</th>
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
                  <td>
                    <div className='flex items-center justify-center gap-1 p-1'>
                      <button
                        onClick={() => handleEditProduct(product.id)}
                        className='bg-green-200 p-2 text-sm rounded-full hover:bg-green-500'
                      >
                        <MdModeEdit />
                      </button>
                      <button className='bg-red-200 p-2 text-sm rounded-full hover:bg-red-500'>
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {showUploadProduct && (
        <AdminUploadProduct closeUpload={handleUploadProduct} />
      )}
      {showEditProduct && (
        <AdminEditProduct productId={productId} closeEdit={handleEditProduct} />
      )}
    </div>
  )
}

export default AllProducts
