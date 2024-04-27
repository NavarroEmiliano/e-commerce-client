/* eslint-disable react/prop-types */
const UserImg = ({ nameImg }) => {
  return (
    <div className='text-base w-[35px] h-[35px] bg-blue-200 rounded-full'>
      <div className='flex items-center justify-center w-full h-full '>
        {nameImg}
      </div>
    </div>
  )
}

export default UserImg
