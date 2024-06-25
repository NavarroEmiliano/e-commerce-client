/* eslint-disable react/prop-types */
import { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import InputUploadForm from './InputUploadForm'
import { FaCloudUploadAlt } from 'react-icons/fa'

import uploadImageService from '../services/uploadImageService'
import DisplayImage from './DisplayImage'
import CustomSelect from './CustomSelect'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import productsService, { uploadProduct } from '../services/productsService'
import { toast } from 'react-toastify'

const AdminUploadProduct = ({ closeUpload }) => {
  const queryClient = useQueryClient()

  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: null,
    stock: null,
    brand: '',
    category: '',
    images: [],
    thumbnail: '',
  })

  const [showFullImg, setShowFullImg] = useState('')

  const { data: allBrands } = useQuery({
    queryKey: ['allBrands'],
    queryFn: productsService.getAllBrands,
    staleTime: Infinity,
  })

  const { data: allCategories } = useQuery({
    queryKey: ['allCategories'],
    queryFn: productsService.getAllCategories,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  const newProductMutation = useMutation({
    mutationFn: uploadProduct,
    onSuccess: ({ data }) => {
      const products = queryClient.getQueryData(['allProducts'])
      queryClient.setQueryData(['allProducts'], products.concat(data))
    },
    onError: (error) => {
      toast.error(error.response.data.data)
    },
  })

  const handleOnChange = (e) => {
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleUploadProductImg = async (e) => {
    const file = e.target.files[0]

    if (product.images.length < 8) {
      const { status, data } = await uploadImageService.uploadImage(file)
      if (status === 'OK') {
        setProduct((prev) => {
          return {
            ...prev,
            images: [...prev.images, data],
          }
        })
      }
    }
  }
  const handleUploadThumbnailImg = async (e) => {
    const file = e.target.files[0]

    if (!product.thumbnail) {
      const { status, data } = await uploadImageService.uploadImage(file)
      if (status === 'OK') {
        setProduct((prev) => {
          return {
            ...prev,
            thumbnail: data,
          }
        })
      }
    }
  }

  const handleDeleteProductImg = async (img) => {
    setProduct((prev) => {
      return {
        ...prev,
        images: prev.images.filter((el) => el !== img),
        thumbnail: prev.thumbnail === img ? '' : prev.thumbnail,
      }
    })
  }

  const handleFullImg = (img) => {
    if (img) return setShowFullImg(img)
    setShowFullImg('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    newProductMutation.mutate(product)
    closeUpload()
  }

  return (
    <div className='fixed w-full h-full top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black/65'>
      <div className='bg-white p-2 sm:p-4 rounded-lg w-full max-w-3xl mx-4'>
        <div className='flex justify-between items-center'>
          <p className='text-1xl font-semibold'>Edit Product</p>
          <button className='text-2xl'>
            <IoCloseOutline onClick={closeUpload} />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-1 justify-between w-full'
        >
          <InputUploadForm
            label='Title'
            type='text'
            name='title'
            placeholder='Enter title here...'
            handleOnChange={handleOnChange}
            value={product?.title}
          />
          <div className='flex flex-col'>
            <label htmlFor='description'>Description</label>
            <textarea
              onChange={handleOnChange}
              value={product?.description}
              name='description'
              id='description'
              placeholder='Enter description...'
              cols='20'
              rows='2'
              className='p-1 resize-none rounded-lg border-2'
              required
            ></textarea>
          </div>

          <InputUploadForm
            label='Price'
            type='number'
            step='0.01'
            name='price'
            min='1'
            placeholder='Enter price here...'
            handleOnChange={handleOnChange}
            value={product?.price}
          />

          <InputUploadForm
            label='Stock'
            type='number'
            min='0'
            name='stock'
            placeholder='Enter stock here...'
            handleOnChange={handleOnChange}
            value={product?.stock}
          />
          <CustomSelect
            label='Brand'
            name='brand'
            options={allBrands}
            handleOnChange={handleOnChange}
            value={product?.brand}
          />
          <CustomSelect
            label='Category'
            name='category'
            options={allCategories}
            handleOnChange={handleOnChange}
            value={product?.category}
          />

          {/* Product image */}
          <div className='flex justify-between mb-1'>
            <label
              htmlFor='uploadImageInput'
              className='w-fit mt-3 rounded cursor-pointer'
            >
              <div className='bg-white border-2 border-blue-600 rounded-2xl px-2 flex justify-center items-center'>
                <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                  <span className='hidden sm:block text-2xl'>
                    <FaCloudUploadAlt />
                  </span>
                  <p className='text-sm'>Upload Product Image</p>
                </div>
                <input
                  type='file'
                  id='uploadImageInput'
                  className='hidden'
                  onChange={handleUploadProductImg}
                />
              </div>
            </label>
            <label
              htmlFor='uploadThumbnailInput'
              className='w-fit mt-3 rounded cursor-pointer'
            >
              <div className='bg-white border-2 border-pink-600 rounded-2xl px-2 flex justify-center items-center'>
                <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                  <span className=' hidden sm:block text-2xl'>
                    <FaCloudUploadAlt />
                  </span>
                  <p className='text-sm'>Upload Thumbnail Image</p>
                </div>
                <input
                  type='file'
                  id='uploadThumbnailInput'
                  className='hidden'
                  onChange={handleUploadThumbnailImg}
                />
              </div>
            </label>
          </div>

          <div className='flex flex-wrap justify-between'>
            {product?.images?.length ? (
              <div className='w-full'>
                <div className='flex flex-wrap w-full items-center justify-start gap-2'>
                  {product?.images?.map((img) => (
                    <div className='relative cursor-pointer group' key={img}>
                      <img
                        src={img}
                        alt={img}
                        onClick={() => handleFullImg(img)}
                        className={`h-14 w-14 sm:h-16 sm:w-16 object-cover object-center rounded-2xl border-2 border-blue-600`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className='text-red-600 text-xs'>
                *Please upload product image
              </p>
            )}
            {product.thumbnail && (
              <div className='text-sm mt-1 flex flex-col items-center justify-center w-fit'>
                <div className='relative rounded-lg cursor-pointer group'>
                  <img
                    src={product.thumbnail}
                    alt={product.thumbnail}
                    onClick={() => handleFullImg(product.thumbnail)}
                    className={`h-14 w-14 sm:h-16 sm:w-16 object-cover object-center rounded-2xl border-2 border-pink-600`}
                  />
                </div>
              </div>
            )}
          </div>

          <button className='border-2 border-pink-600 py-2 rounded-lg hover:text-white  hover:bg-pink-600'>
            Upload Product
          </button>
        </form>
      </div>
      {showFullImg && (
        <DisplayImage
          imgUrl={showFullImg}
          onClose={handleFullImg}
          handleDeleteImg={handleDeleteProductImg}
        />
      )}
    </div>
  )
}

export default AdminUploadProduct
