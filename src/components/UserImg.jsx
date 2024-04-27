import { useSelector } from "react-redux"

/* eslint-disable react/prop-types */
const UserImg = ({size, textSize}) => {

  const nameImg = useSelector(state => state.user.name.split('',2).join('').toUpperCase())
  
  return (
    <div className={`text-${textSize} w-[${size}px] h-[${size}px] bg-blue-200 rounded-full`}>
      <div className='flex items-center justify-center w-full h-full '>
        {nameImg}
      </div>
    </div>
  )
}

export default UserImg
