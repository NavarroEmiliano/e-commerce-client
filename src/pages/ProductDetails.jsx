import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productsService from '../services/productsService'
import StarRating from '../components/StarRating'
import displayUsdCurrency from '../helpers/displayCurrency'
import calculateDiscountedPrice from '../helpers/calculateDiscountedPrice'
import VerticalCardProduct from '../components/VerticalCardProduct'
import { useDispatch } from 'react-redux'
import { addToCartAction } from '../features/userCartSlice'

const ProductDetails = () => {
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(true)
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  })

  const [zoomImage, setZoomImage] = useState(false)

  const dispatch = useDispatch()

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
  }, [productId])

  const handleMouseEnterProduct = (imageUrl) => {
    setActiveImage(imageUrl)
  }

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true)
      const { left, top, width, height } = e.target.getBoundingClientRect()

      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      setZoomImageCoordinate({ x, y })
    },
    [zoomImageCoordinate],
  )

  const handleZoomOutImage = () => {
    setZoomImage(false)
  }

  const handleAddToCart = (productId) => {
    dispatch(addToCartAction(productId))
  }

  return (
    <div className='container mx-auto p-4 '>
      <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* Product Image */}
        <div className='flex flex-col items-center h-96  lg:flex-row-reverse gap-4'>
          {loading ? (
            <div className='h-[300px] rounded-lg w-[300px] lg:h-[400px] lg:w-[400px] bg-slate-200 animate-pulse'></div>
          ) : (
            <div className='h-[300px] rounded-lg w-[300px] lg:h-[400px] lg:w-[400px]  relative'>
              <img
                onMouseLeave={handleZoomOutImage}
                onMouseMove={handleZoomImage}
                src={activeImage}
                alt={product.title}
                className='h-full w-full object-scale-down  rounded-lg'
              />
              {/* Zoom img */}

              {zoomImage && (
                <div className='hidden rounded-lg lg:block absolute w-[300px] h-[300px] overflow-hidden  -right-[320px] top-0 '>
                  <div
                    className='w-full h-full min-h-[300px] min-w-[300px] scale-150 '
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                        zoomImageCoordinate.y * 100
                      }%`,
                    }}
                  ></div>
                </div>
              )}
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
                {product?.images?.map((imgUrl) => {
                  return (
                    <div
                      key={imgUrl}
                      className='h-14 w-14 bg-slate-200 rounded p-1'
                    >
                      <img
                        className='w-full h-full object-cover mix-blend-multiply'
                        src={imgUrl}
                        alt={imgUrl}
                        onMouseEnter={() => handleMouseEnterProduct(imgUrl)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
        {/* Product Details */}

        {loading ? (
          <div className='flex flex-col gap-2 w-[400px]'>
            <p className='bg-slate-200 animate-pulse h-6 w-1/3 rounded-lg capitalize'></p>
            <h2 className='text-2xl bg-slate-200 rounded-lg lg:text-4xl h-10 w-full font-medium animate-pulse'></h2>
            <p className='bg-slate-200 animate-pulse h-6 w-1/3 rounded-lg'></p>
            <div className='bg-slate-200 animate-pulse h-6 w-1/3 rounded-lg'></div>
            <div className='flex gap-2 text-3xl font-semibold '>
              <p className='bg-slate-200 animate-pulse h-8 w-1/3 rounded-lg'></p>
              <p className='bg-slate-200 animate-pulse h-8 w-1/3 rounded-lg'></p>
            </div>
            <div className='flex items-center gap-3 '>
              <button className='bg-slate-200 animate-pulse h-8 w-1/3 rounded-lg'></button>
              <button className='bg-slate-200 animate-pulse h-8 w-1/3 rounded-lg'></button>
            </div>

            <div>
              <p className='bg-slate-200 animate-pulse h-6 w-1/3 rounded-lg mb-2'></p>
              <p className='bg-slate-200 animate-pulse h-14 w-full rounded-lg'></p>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            <p className='bg-red-200 w-fit text-red-600 px-2 rounded-full capitalize'>
              {product?.brand}
            </p>
            <h2 className='text-2xl lg:text-4xl font-medium'>
              {product?.title}
            </h2>
            <p className='capitalize text-slate-400'>{product?.category}</p>
            <div>
              <StarRating rating={product?.rating} />
            </div>
            <div className='flex gap-2 text-3xl font-semibold '>
              <p className='text-red-600'>
                {displayUsdCurrency(
                  calculateDiscountedPrice(
                    product.price,
                    product.discountPercentage,
                  ),
                )}
              </p>
              <p className='line-through text-gray-400'>
                {displayUsdCurrency(product?.price)}
              </p>
            </div>
            <div className='flex items-center gap-3 '>
              <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white'>
                Buy
              </button>
              <button
                onClick={() => handleAddToCart(product.id)}
                className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px]  bg-red-600 font-medium text-white hover:text-red-600 hover:bg-white'
              >
                Add To Cart
              </button>
            </div>

            <div>
              <p className='text-slate-600 font-medium my-1'>Description: </p>
              <p>{product.description}</p>
            </div>
          </div>
        )}
      </div>
      <VerticalCardProduct
        category={product?.category}
        heading={'Recommended Product'}
      />
    </div>
  )
}

export default ProductDetails
