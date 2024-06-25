/* eslint-disable react/prop-types */
import { MdDelete, MdModeEdit } from "react-icons/md"
import displayUsdCurrency from "../helpers/displayCurrency"

const ProductCardAdmin = ({product,onEdit,onDelete}) => {
  return (
    <div
    key={product?.id}
    className='flex gap-4 p-2 border-2 border-pink-200 rounded-2xl mb-4'
  >
    <div className='flex items-center justify-center w-full max-h-28 max-w-28'>
      <img
        src={product?.thumbnail}
        alt={product.description}
        className='object-center rounded-xl max-w-28 max-h-28'
      />
    </div>
    <div className='flex flex-col justify-between'>
      <p className='font-semibold text-ellipsis line-clamp-1'>
        {product?.title}
      </p>
      <div className='flex gap-2'>
        <p className='text-xs text-gray-500'>Brand</p>
        <p className='capitalize text-gray-600 text-xs'>{product?.brand}</p>
      </div>

      <div className='flex gap-2'>
        <p className=' text-gray-500'>Price</p>
        <p>{displayUsdCurrency(product?.price)}</p>
      </div>
      <div className='flex gap-2'>
        <p className='text-gray-500'>Stock</p>
        <p className='font-semibold'>{product?.stock}</p>
      </div>
      <div className='flex gap-2 text-sm'>
        <p className='text-gray-500'>Category</p>
        <p className='capitalize text-gray-700'>{product?.category}</p>
      </div>
    </div>
    <div className='flex flex-col items-center ml-auto gap-4'>
      <button
        onClick={() => onEdit(product.id)}
        className='bg-green-200 p-2 text-sm rounded-full hover:bg-green-500'
      >
        <MdModeEdit t />
      </button>
      <button
        onClick={() => onDelete(product.id)}
        className='bg-red-200 p-2 text-sm rounded-full hover:bg-red-500'
      >
        <MdDelete />
      </button>
    </div>
  </div>
  )
}

export default ProductCardAdmin