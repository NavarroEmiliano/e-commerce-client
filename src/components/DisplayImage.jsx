/* eslint-disable react/prop-types */
import { IoCloseOutline } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'

const DisplayImage = ({ imgUrl, onClose, handleDeleteImg }) => {
  return (
    <div className='fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-black/65'>
      <div className='relative  bg-white w-96 shadow-2xl rounded-xl max-w-3xl mx-auto p-2'>
        <div>
          <button className='block text-3xl border-2 hover:scale-105 duration-75 rounded-2xl mb-1 border-red-600 ml-auto'>
            <IoCloseOutline onClick={() => onClose('')} />
          </button>
          <img
            src={imgUrl}
            alt={imgUrl}
            className='flex justify-center shadow-lg rounded-lg'
          />
        </div>
        <button
          onClick={() => {
            handleDeleteImg(imgUrl)
            onClose('')
          }}
          className='absolute text-2xl p-3 bg-red-600 rounded-full bottom-2 right-2 hover:text-white'
        >
          <MdDelete />
        </button>
      </div>
    </div>
  )
}

export default DisplayImage
