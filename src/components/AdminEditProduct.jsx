/* eslint-disable react/prop-types */
import { IoCloseOutline } from 'react-icons/io5'
import InputUploadForm from './InputUploadForm'
import { useEffect, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import DisplayImage from './DisplayImage'
import uploadImageService from '../services/uploadImageService'
import CustomSelect from './CustomSelect'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import productsService from '../services/productsService'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const AdminEditProduct = ({ closeEdit, productId }) => {
  const [productToUpdate, setProductToUpdate] = useState(null)
  const [showFullImg, setShowFullImg] = useState('')
  const queryClient = useQueryClient()

  const { isPending, data: product } = useQuery({
    queryKey: ['productById'],
    queryFn: () => productsService.getProductById(productId),
    enabled: !!productId,
  })

  const { data: allBrands } = useQuery({
    queryKey: ['allBrands'],
    queryFn: productsService.getAllBrands,
    staleTime: Infinity,
  })

  const { data: allCategories } = useQuery({
    queryKey: ['allCategories'],
    queryFn: productsService.getAllCategories,
    staleTime: Infinity,
  })

  const editProductMutation = useMutation({
    mutationFn: productsService.updateProduct,
    onSuccess: ({ data }) => {
      toast.success('Successfully updated product')
      const products = queryClient.getQueryData(['allProducts'])
      queryClient.setQueryData(
        ['allProducts'],
        products.map((prod) => (prod.id !== data.id ? prod : data)),
      )
    },
    onError: (error) => {
      toast.error(error.response.data.data)
    },
  })

  const handleOnChange = (e) => {
    setProductToUpdate((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleUploadProductImg = async (e) => {
    const file = e.target.files[0]

    if (product.images.length < 5) {
      const { status, data } = await uploadImageService.uploadImage(file)
      if (status === 'OK') {
        setProductToUpdate((prev) => {
          return {
            ...prev,
            images: [...prev.images, data],
          }
        })
      }
    }
  }

  const handleDeleteProductImg = async (img) => {
    setProductToUpdate((prev) => {
      return { ...prev, images: prev.images.filter((el) => el !== img) }
    })
  }

  const handleFullImg = (img) => {
    if (img) return setShowFullImg(img)
    setShowFullImg('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    editProductMutation.mutate(productToUpdate)
    closeEdit()
  }

  useEffect(() => {
    if (product && !isPending)
      setProductToUpdate({
        id: product?.id,
        title: product?.title,
        description: product?.description,
        price: product?.price,
        stock: product?.stock,
        brand: product?.brand,
        category: product?.category,
        images: product?.images,
      })
  }, [product])

  return (
    <div className='fixed w-full h-full top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black/65'>
      <div className='bg-white p-2 rounded-lg w-full max-w-sm'>
        <div className='flex justify-between items-center'>
          <p className='text-1xl font-semibold'>Edit Product</p>
          <button className='text-2xl'>
            <IoCloseOutline onClick={closeEdit} />
          </button>
        </div>
        {isPending ? (
          <div className='grid place-items-center h-[600px]'>
            <Loading />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-2 justify-between w-full'
          >
            <InputUploadForm
              label='Title'
              type='text'
              name='title'
              placeholder='Enter title here...'
              handleOnChange={handleOnChange}
              value={productToUpdate?.title}
            />
            <div className='flex flex-col'>
              <label htmlFor='description'>Description</label>
              <textarea
                onChange={handleOnChange}
                value={productToUpdate?.description}
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
              name='price'
              min='1'
              placeholder='Enter price here...'
              handleOnChange={handleOnChange}
              value={productToUpdate?.price}
            />

            <InputUploadForm
              label='Stock'
              type='number'
              min='0'
              name='stock'
              placeholder='Enter stock here...'
              handleOnChange={handleOnChange}
              value={productToUpdate?.stock}
            />
            <CustomSelect
              label='Brand'
              name='brand'
              options={allBrands}
              handleOnChange={handleOnChange}
              value={productToUpdate?.brand}
            />
            <CustomSelect
              label='Category'
              name='category'
              options={allCategories}
              handleOnChange={handleOnChange}
              value={productToUpdate?.category}
            />

            {/* Product image */}
            <label htmlFor='uploadImageInput' className='mt-3 p-2 rounded'>
              <div className='bg-white border rounded flex justify-center items-center'>
                <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                  <span className='text-4xl'>
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
            <p className='text-center'>Limit: 5</p>

            <div className='flex flex-wrap justify-around'>
              {productToUpdate?.images?.length ? (
                productToUpdate?.images?.map((img) => (
                  <div
                    className='relative rounded-lg cursor-pointer group'
                    key={img}
                  >
                    <img
                      src={img}
                      alt={img}
                      onClick={() => handleFullImg(img)}
                      className='h-16 w-16 object-cover object-center rounded border-2 border-slate-200'
                    />
                    <div
                      className='absolute bg-red-600 text-white rounded-full p-1 text-xl bottom-0 right-0 hidden group-hover:block'
                      onClick={() => handleDeleteProductImg(img)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-red-600 text-xs'>
                  *Please upload product image
                </p>
              )}
            </div>

            <button className='border-2 border-pink-600 py-2 rounded-lg hover:text-white  hover:bg-pink-600'>
              Edit Product
            </button>
          </form>
        )}
      </div>
      {showFullImg && (
        <DisplayImage imgUrl={showFullImg} onClose={handleFullImg} />
      )}
    </div>
  )
}

export default AdminEditProduct
