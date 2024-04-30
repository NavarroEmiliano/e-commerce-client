import { useState } from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { FaAngleRight } from 'react-icons/fa'

//Desktop banners
import watchBanner from '../assets/watch-banner.jpg'
import sunglassesBanner from '../assets/sunglasses-banner.jpeg'
import shoesBanner from '../assets/shoes-banner.jpg'
import fashionBagBanner from '../assets/fashion-bag-banner.jpg'

//Mobile banners
import womenShoesMobile from '../assets/smartwatch-mobile-banner.webp'
import smartWatchMobile from '../assets/women-shoes-mobile.jpg'
import lightingMobileBanner from '../assets/lighting-mobile-banner.jpg'

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0)

  const desktopImages = [
    watchBanner,
    sunglassesBanner,
    shoesBanner,
    fashionBagBanner
  ]

  const mobileImages = [
    womenShoesMobile,
    smartWatchMobile,
    lightingMobileBanner
  ]

  const nextImage = () => {
    if (currentImage < desktopImages.length - 1) {
      setCurrentImage(prev => prev + 1)
    }
  }

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage(prev => prev - 1)
    }
  }

  return (
    <div className='container mx-auto rounded'>
      <div className='h-72 w-full relative '>
        <div className='absolute  z-10  h-full w-full md:flex items-center hidden'>
          <div className='flex justify-between w-full text-2xl'>
            <button
              onClick={prevImage}
              className='bg-white shadow-md rounded-full p-1 '
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className='bg-white shadow-md rounded-full p-1'
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className='flex h-full w-full overflow-hidden'>
          {desktopImages.map((img, index) => (
            <div
              key={index}
              className='w-full h-full min-w-full min-h-full translate duration-300'
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img
                src={img}
                alt={`img${index}`}
                className='w-full h-full object-cover'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BannerProduct
