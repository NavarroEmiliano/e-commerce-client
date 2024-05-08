/* eslint-disable react/prop-types */
import { IoCloseOutline } from 'react-icons/io5'

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className='fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 '>
      <div className='bg-white w-96 shadow-2xl rounded-xl max-w-3xl mx-auto p-2'>
        <div>
          <button className='block text-2xl ml-auto'>
            <IoCloseOutline onClick={() => onClose('')} />
          </button>
          <img
            src={imgUrl}
            alt={imgUrl}
            className='flex justify-center shadow-lg rounded-lg'
          />
        </div>
      </div>
    </div>
  )
}

export default DisplayImage
