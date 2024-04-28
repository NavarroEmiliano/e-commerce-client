/* eslint-disable react/prop-types */
import { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import InputUploadForm from './InputUploadForm'
import SelectWithCustomOption from './SelectWithCustonOption'

const UploadProduct = ({ closeUpload }) => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: null,
    discountPercentage: null,
    rating: null,
    stock: null,
    brand: '',
    category: '',
    images: []
  })

  const handleOnChange = e => {
    setProduct(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const brandsOptions = ['Brand 1', 'Brand 2', 'Brand 3']

  console.log(product)

  return (
    <div className='fixed w-full h-full top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-45'>
      <div className=' bg-white p-4 rounded-lg w-full max-w-4xl h-full max-h-[90%] shadow-lg'>
        <div className='flex justify-between items-center bg-slate-500'>
          <p className='font-semibold'>Upload Product</p>
          <button className='text-2xl'>
            <IoCloseOutline onClick={closeUpload} />
          </button>
        </div>
        <form>
          <div className='grid gap-4 w-3/5 bg-blue-700'>
            <h3>General information</h3>
            <InputUploadForm
              label='Title'
              type='text'
              name='title'
              placeholder='Enter title here...'
              handleOnChange={handleOnChange}
              value={product.title}
            />
            <InputUploadForm
              label='Description'
              type='text'
              name='description'
              placeholder='Enter description here...'
              handleOnChange={handleOnChange}
              value={product.description}
            />
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
              label='Discount percentage'
              type='number'
              step={0.01}
              min='0'
              max='100'
              name='discountPercentage'
              placeholder='Enter discount here...'
              handleOnChange={handleOnChange}
              value={product.discountPercentage}
            />
            <InputUploadForm
              label='Rating'
              type='number'
              step={0.01}
              min='0'
              max='5'
              name='rating'
              placeholder='Enter rating here...'
              handleOnChange={handleOnChange}
              value={product.rating}
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
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadProduct
