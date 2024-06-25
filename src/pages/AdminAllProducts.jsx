import { useState } from 'react'
import AdminEditProduct from '../components/AdminEditProduct'
import AdminUploadProduct from '../components/AdminUploadProduct'
import { useQuery } from '@tanstack/react-query'
import productsService from '../services/productsService'
import Loading from '../components/Loading'
import AdminDeleteProduct from '../components/AdminDeleteProduct'
import useBlockScroll from '../hooks/useBlockScroll'
import ProductCardAdmin from '../components/ProductCardAdmin'

const AdminAllProducts = () => {
  const { isPending, data: allProducts } = useQuery({
    queryKey: ['allProducts'],
    queryFn: productsService.getAllProducts,
    staleTime: Infinity,
  })

  const [showUploadProduct, setShowUploadProduct] = useState(false)
  const [showEditProduct, setShowEditProduct] = useState(false)
  const [showDeleteProduct, setShowDeleteProduct] = useState(false)
  const [productId, setProductId] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  const handleUploadProduct = () => {
    setShowUploadProduct((prev) => !prev)
  }

  const handleEditProduct = (id = '') => {
    setShowEditProduct((prev) => !prev)
    setProductId(id)
  }

  const handleDeleteProduct = (id = '') => {
    setShowDeleteProduct((prev) => !prev)
    setProductId(id)
  }

  const handleSearch = (e) => {
    const { value } = e.target
    setSearchInput(value)
  }

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  let sortedProducts = [...(allProducts || [])]

  if (sortBy === 'price') {
    sortedProducts = sortedProducts.sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price,
    )
  } else if (sortBy === 'stock') {
    sortedProducts = sortedProducts.sort((a, b) =>
      sortOrder === 'asc' ? a.stock - b.stock : b.stock - a.stock,
    )
  }

  const filteredProducts = sortedProducts?.filter(
    (product) =>
      product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchInput.toLowerCase()) ||
      product.category.toLowerCase().includes(searchInput.toLowerCase()),
  )

  const blockScroll = showUploadProduct || showEditProduct || showDeleteProduct

  useBlockScroll(blockScroll)

  if (isPending) {
    return (
      <div className='flex items-center justify-center min-h-[calc(100vh-140px)]'>
        <Loading />
      </div>
    )
  }

  return (
    <div className='mx-4 sm:mx-0 md:mx-12'>
      <div className='flex justify-between items-center py-2'>
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
          className='rounded-xl border-2 border-pink-600 px-2 py-1 bg-pink-600 text-white hover:text-black hover:bg-white'
        >
          Upload Product
        </button>
      </div>
      <div className='flex gap-4 text-gray-500 border-2 border-pink-200 mb-2 rounded-2xl p-2'>
        <div className='font-semibold text-gray-400'>Sort By</div>
        <div className='flex'>
          <button
            onClick={() => handleSort('price')}
            className='font-semibold mr-2'
          >
            Price
          </button>
          <div className='h-4 w-4'>
            {sortBy === 'price' && (
              <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
            )}
          </div>
        </div>
        <div className='flex'>
          <button
            onClick={() => handleSort('stock')}
            className='font-semibold mr-2'
          >
            Stock
          </button>
          <div className='h-4 w-4'>
            {sortBy === 'stock' && (
              <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
            )}
          </div>
        </div>
      </div>
      {filteredProducts?.map((prod) => (
        <ProductCardAdmin
          key={prod.id}
          product={prod}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      ))}
      {showUploadProduct && (
        <AdminUploadProduct closeUpload={handleUploadProduct} />
      )}
      {showEditProduct && (
        <AdminEditProduct productId={productId} closeEdit={handleEditProduct} />
      )}
      {showDeleteProduct && (
        <AdminDeleteProduct
          productId={productId}
          closeDelete={handleDeleteProduct}
        />
      )}
    </div>
  )
}

export default AdminAllProducts
