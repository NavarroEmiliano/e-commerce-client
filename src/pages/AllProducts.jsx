import { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAllProductsAction } from '../features/productsSlice'

const AllProducts = () => {
  const products = useSelector(state => state.products)
  const [showUploadProduct, setShowUploadProduct] = useState(false)
  const dispatch = useDispatch()

  const handleUploadProduct = () => {
    setShowUploadProduct(prev => !prev)
  }

  useEffect(() => {
    if (!products.length) dispatch(initializeAllProductsAction())
  }, [])

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
      <div>{
        products.map((product,index) => (
          <div key={product.id}>
            <img src={product.images[0]} alt={product.description} width={100} height={100}/>
          </div>
        ))}</div> 
    </div>
  )
}

export default AllProducts
