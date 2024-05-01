import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productsService from '../services/productsService'
import { FaStar } from "react-icons/fa";
import StarRating from '../components/StarRating';


const ProductDetails = () => {
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(true)

  const { productId } = useParams()


  const productImageListLoading = new Array(4).fill(null)

  useEffect(() => {
    const getProduct = async () => {
      const response = await productsService.getProductsById(productId)
      if (response.status === 'OK') {
        setProduct(response.data)
        setActiveImage(response.data.images[0])
        setLoading(false)
      }
    }
    getProduct()
  }, [])


  const handleMouseEnterProduct = (imageUrl) =>{
    setActiveImage(imageUrl)
  }


  return (
    <div className='container mx-auto p-4 '>
      <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* Product Image */}
        <div className='flex flex-col h-96  lg:flex-row-reverse gap-4'>
          {loading ? (
            <div className='h-[300px] w-[300px] lg:h-[500px] lg:w-[500px] bg-slate-200 animate-pulse'></div>
          ) : (
            <div className='h-[300px] w-[300px] lg:h-[500px] lg:w-[500px] bg-slate-200 '>
              <img
                src={activeImage}
                alt={product.title}
                className='h-full w-full object-cover mix-blend-multiply rounded-lg'
              />
            </div>
          )}

          <div className='h-full'>
            {loading ? (
              <div className='flex gap-2 lg:flex-col  h-full '>
                {productImageListLoading.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className='h-14 w-14 bg-slate-200 rounded animate-pulse'
                    ></div>
                  )
                })}
              </div>
            ) : (
              <div className='flex  gap-2 lg:flex-col  h-full'>
                {product?.images?.map(imgUrl => {
                  return (
                    <div
                      key={imgUrl}
                      className='h-14 w-14 bg-slate-200 rounded p-1'
                    >
                      <img
                        className='w-full h-full object-cover mix-blend-multiply'
                        src={imgUrl}
                        alt={imgUrl}
                        onMouseEnter={()=> handleMouseEnterProduct(imgUrl)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
        {/* Product Details */}
        <div>
          <p className='bg-red-200 w-fit text-red-600 px-2 rounded-full capitalize'>{product?.brand}</p>
          <h2 className='text-2xl lg:text-4xl font-medium'>{product?.title}</h2>
          <p className='capitalize text-slate-400'>{product?.category}</p>
          <div>
            <StarRating rating={product?.rating}/> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
