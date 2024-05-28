import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PurchaseSuccessMessage = () => {
  const [seconds, setSeconds] = useState(8)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (seconds === 0) {
      navigate('/')
    }
  }, [seconds])

  return (
    <div className='flex flex-col justify-center items-center min-h-[calc(100vh-112px)]'>
      <div className='text-center'>
        <p className='text-lg font-bold mb-4'>
          Your purchase has been processed successfully!
        </p>
        <p className='text-sm'>Redirecting to home in {seconds} seconds...</p>
      </div>
    </div>
  )
}

export default PurchaseSuccessMessage
