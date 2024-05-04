import { useSelector } from 'react-redux'

/* eslint-disable react/prop-types */
const UserImg = ({ textSize }) => {
  const nameImg = useSelector((state) =>
    state.user?.name?.split('', 2).join('').toUpperCase(),
  )

  return (
    <div className={`text-${textSize} w-full h-full`}>
      <div
        className={`flex items-center justify-center bg-blue-200  w-full h-full rounded-full`}
      >
        {nameImg}
      </div>
    </div>
  )
}

export default UserImg
