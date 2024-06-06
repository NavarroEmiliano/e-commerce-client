import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productsService from '../services/productsService'
import StarRating from '../components/StarRating'
import displayUsdCurrency from '../helpers/displayCurrency'
import calculateDiscountedPrice from '../helpers/calculateDiscountedPrice'
import RecommendedProductCarrousel from '../components/RecommendedProductCarrousel'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import cartService from '../services/cartService'
import { toast } from 'react-toastify'

const ProductDetails = () => {
  const [activeImage, setActiveImage] = useState('')
  const { productId } = useParams()
  const queryClient = useQueryClient()

  const {
    isPending,
    data: product,
    refetch,
  } = useQuery({
    queryKey: ['productById'],
    queryFn: () => productsService.getProductById(productId),
    enabled: !!productId,
    refetchOnWindowFocus: false,
  })

  const productImageListLoading = new Array(4).fill(null)

  const addToCartMutation = useMutation({
    mutationFn: cartService.addToCart,
    onSuccess: () => {
      toast.success('Product added to cart')
      queryClient.setQueryData(['countCart'], (oldData) => oldData + 1)
    },
    onError: (error) => {
      toast.error(error.response.data.data)
    },
  })

  const handleMouseEnterProduct = (imageUrl) => {
    setActiveImage(imageUrl)
  }

  const handleAddToCart = (productId) => {
    addToCartMutation.mutate(productId)
  }

  useEffect(() => {
    if (!isPending && product) {
      setActiveImage(product?.images[0])
    }
  }, [product])

  useEffect(() => {
    if (productId) refetch()

    return () => {
      queryClient.removeQueries({ queryKey: ['productById'] })
    }
  }, [productId, queryClient])

  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] sm:px-20 lg:px-28 flex flex-col md:flex-row gap-4'>
        {/* Product Image */}
        <div className='flex flex-col items-center h-[400px] lg:flex-row-reverse gap-4'>
          {isPending ? (
            <div className='h-[300px] w-[300px] lg:h-[400px] lg:w-[400px] bg-slate-200 animate-pulse'></div>
          ) : (
            <div className='min-h-[300px] w-[300px] lg:h-[400px] lg:w-[400px] relative'>
              <img
                src={activeImage}
                alt={product?.title}
                className='h-full w-full object-scale-down'
              />
            </div>
          )}

          <div>
            {isPending ? (
              <div className='flex gap-2 lg:flex-col h-full '>
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
              <div className='flex justify-between w-[300px] lg:w-auto gap-2 lg:flex-col h-full'>
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

        {isPending ? (
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
            <p className='bg-red-200 w-fit text-red-600 py2 px-4 rounded-full capitalize'>
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
      <RecommendedProductCarrousel
        category={product?.category}
        heading={'Recommended Product'}
      />
    </div>
  )
}

export default ProductDetails
