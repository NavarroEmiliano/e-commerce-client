import { useState } from 'react'
import UploadProduct from '../components/UploadProduct'

const AllProducts = () => {
  const [showUploadProduct, setShowUploadProduct] = useState(false)

  const handleUploadProduct = () => {
    setShowUploadProduct(prev => !prev)
  }

  return (
    <div className='border'>
      <div className='flex justify-between items-center py-2 px-4 '>
        <h2 className='font-bold text-lg'>All products</h2>
        <button
          onClick={handleUploadProduct}
          className='border-2 border-red-600 rounded-full px-2 py-1 hover:bg-red-600 hover:text-white'
        >
          Upload Product
        </button>
      </div>
      {showUploadProduct && <UploadProduct closeUpload={handleUploadProduct} />}
    </div>
  )
}

export default AllProducts
