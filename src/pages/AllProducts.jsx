import { useState } from 'react'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import AdminEditProduct from '../components/AdminEditProduct'
import AdminUploadProduct from '../components/AdminUploadProduct'
import displayUsdCurrency from '../helpers/displayCurrency'
import { useSelector } from 'react-redux'

const AllProducts = () => {
  const products = useSelector((state) => state.products)
  const [showUploadProduct, setShowUploadProduct] = useState(false)
  const [showEditProduct, setShowEditProduct] = useState(false)
  const [productId, setProductId] = useState('')

  const handleUploadProduct = () => {
    setShowUploadProduct((prev) => !prev)
  }

  const handleEditProduct = (id = '') => {
    setShowEditProduct((prev) => !prev)
    setProductId(id)
  }

  return (
    <div className='border'>
      <div className='flex justify-between items-center py-2 px-4 border-b'>
        <h2 className='font-bold text-lg'>All products</h2>
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
            {products?.map((product) => {
              return (
                <tr key={product?.id}>
                  <td>
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
                    <button
                      onClick={() => handleEditProduct(product.id)}
                      className='bg-green-200 p-2 rounded-full hover:bg-green-500'
                    >
                      <MdModeEdit />
                    </button>
                    <button className='bg-red-200 p-2 rounded-full hover:bg-red-500'>
                      <MdDelete />
                    </button>
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
