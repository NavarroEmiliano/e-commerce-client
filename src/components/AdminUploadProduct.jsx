/* eslint-disable react/prop-types */
import { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import InputUploadForm from './InputUploadForm'
import SelectWithCustomOption from './SelectWithCustonOption'
import { FaCloudUploadAlt } from 'react-icons/fa'

import uploadImageService from '../services/uploadImageService'
import DisplayImage from './DisplayImage'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { uploadProductAction } from '../features/productsSlice'

const AdminUploadProduct = ({ closeUpload }) => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: null,
    stock: null,
    brand: '',
    category: '',
    images: []
  })

  const [showFullImg, setShowFullImg] = useState('')

  const dispatch = useDispatch()

  const handleOnChange = e => {
    setProduct(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleUploadProductImg = async e => {
    const file = e.target.files[0]

    if (product.images.length < 5) {
      const { status, data } = await uploadImageService.uploadImage(file)
      if (status === 'OK') {
        setProduct(prev => {
          return {
            ...prev,
            images: [...prev.images, data]
          }
        })
      }
    }
  }

  const handleDeleteProductImg = async img => {
    setProduct(prev => {
      return { ...prev, images: prev.images.filter(el => el !== img) }
    })
  }

  const handleFullImg = img => {
    if (img) return setShowFullImg(img)
    setShowFullImg('')
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(uploadProductAction(product,closeUpload))
  }

  const brandsOptions = ['Brand 1', 'Brand 2', 'Brand 3']
  const categoriesOptions = ['Category 1', 'Category 2', 'Category 3']

  return (
    <div className='fixed w-full h-full top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black/45'>
      <div className='bg-white p-2 rounded-lg w-full max-w-4xl h-full max-h-[95%] shadow-lg'>
        <div className='flex justify-between items-center '>
          <p className='text-1xl font-semibold'>Upload Product</p>
          <button className='text-2xl'>
            <IoCloseOutline onClick={closeUpload} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className='flex justify-between h-full'>
          <div className='grid w-[60%] border shadow-lg p-2 bg-slate-100 h-[95%] rounded-lg'>
            <h3>General information</h3>
            <InputUploadForm
              label='Title'
              type='text'
              name='title'
              placeholder='Enter title here...'
              handleOnChange={handleOnChange}
              value={product.title}
            />
            <div className='flex flex-col'>
              <label htmlFor='description'>Description</label>
              <textarea
                onChange={handleOnChange}
                value={product.description}
                name='description'
                id='description'
                placeholder='Enter description...'
                cols='20'
                rows='2'
                className='p-1 resize-none rounded-lg'
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
              value={product.price}
            />

            <InputUploadForm
              label='Stock'
              type='number'
              min='0'
              name='stock'
              placeholder='Enter stock here...'
              handleOnChange={handleOnChange}
              value={product.stock}
            />
            <SelectWithCustomOption
              label='Brand'
              name='brand'
              options={brandsOptions}
              handleOnChange={handleOnChange}
              value={product.brand}
            />
            <SelectWithCustomOption
              label='Category'
              name='category'
              options={categoriesOptions}
              handleOnChange={handleOnChange}
              value={product.category}
            />
          </div>
          <div className='flex flex-col justify-between border shadow-lg p-2 bg-slate-100 w-[39%] h-[95%] rounded-lg'>
            <div>
              <label htmlFor='uploadImageInput' className='mt-3  p-2 rounded'>
                <span>Product image</span>
                <div className='bg-white border rounded h-32 flex justify-center items-center'>
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

              <div className='flex flex-wrap mt-6 justify-around'>
                {product?.images.length ? (
                  product.images.map(img => (
                    <div
                      className='relative   mt-2  rounded-lg cursor-pointer group'
                      key={img}
                    >
                      <img
                        src={img}
                        alt={img}
                        onClick={() => handleFullImg(img)}
                        className=' h-36 w-36 object-cover object-center'
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
            </div>

            <button className='border py-2 rounded-lg bg-red-600'>
              Upload Product
            </button>
          </div>
        </form>
      </div>
      {showFullImg && (
        <DisplayImage imgUrl={showFullImg} onClose={handleFullImg} />
      )}
    </div>
  )
}

export default AdminUploadProduct
