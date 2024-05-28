import { useState } from 'react'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import AdminEditProduct from '../components/AdminEditProduct'
import AdminUploadProduct from '../components/AdminUploadProduct'
import displayUsdCurrency from '../helpers/displayCurrency'
import { useQuery } from '@tanstack/react-query'
import productsService from '../services/productsService'
import Loading from '../components/Loading'
import AdminDeleteProduct from '../components/AdminDeleteProduct'

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
    <div className='rounded-md'>
      <div className='flex justify-between items-center py-2 px-4'>
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

      {filteredProducts?.map((prod) => (
        <div
          key={prod?.id}
          className='flex gap-4 p-2 border-2 border-pink-200 rounded-2xl m-4'
        >
          <div className='flex items-center justify-center w-full max-h-28 max-w-28'>
            <img
              src={prod?.images[0]}
              alt={prod.description}
              className='object-center rounded-xl max-w-28 max-h-28'
            />
          </div>
          <div className='flex flex-col justify-between'>
            <p className='font-semibold text-ellipsis line-clamp-1'>
              {prod?.title}
            </p>
            <div className='flex gap-2'>
              <p className='text-xs text-gray-500'>Brand</p>
              <p className='capitalize text-gray-600 text-xs'>{prod?.brand}</p>
            </div>

            <div className='flex gap-2'>
              <p className=' text-gray-500'>Price</p>
              <p>{displayUsdCurrency(prod?.price)}</p>
            </div>
            <div className='flex gap-2'>
              <p className='text-gray-500'>Stock</p>
              <p className='font-semibold'>{prod?.stock}</p>
            </div>
            <div className='flex gap-2 text-sm'>
              <p className='text-gray-500'>Category</p>
              <p className='capitalize text-gray-700'>{prod?.category}</p>
            </div>
          </div>
          <div className='flex flex-col items-center ml-auto gap-4'>
            <button
              onClick={() => handleEditProduct(prod.id)}
              className='bg-green-200 p-2 text-sm rounded-full hover:bg-green-500'
            >
              <MdModeEdit />
            </button>
            <button
              onClick={() => handleDeleteProduct(prod.id)}
              className='bg-red-200 p-2 text-sm rounded-full hover:bg-red-500'
            >
              <MdDelete />
            </button>
          </div>
        </div>
      ))}

      {/* <div className='overflow-y-auto h-[calc(100vh-190px)]'>
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
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className='bg-red-200 p-2 text-sm rounded-full hover:bg-red-500'
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div> */}
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
