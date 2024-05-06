import Carousel from 'react-multi-carousel'

// Desktop banners
import watchBanner from '../assets/watch-banner.jpg'
import sunglassesBanner from '../assets/sunglasses-banner.jpeg'
import shoesBanner from '../assets/shoes-banner.jpg'
import fashionBagBanner from '../assets/fashion-bag-banner.jpg'

// Mobile banners
import womenShoesMobile from '../assets/smartwatch-mobile-banner.webp'
import smartWatchMobile from '../assets/women-shoes-mobile.jpg'
import lightingMobileBanner from '../assets/lighting-mobile-banner.jpg'

const BannerProduct = () => {
  const desktopImages = [
    watchBanner,
    sunglassesBanner,
    shoesBanner,
    fashionBagBanner,
  ]

  const mobileImages = [
    womenShoesMobile,
    smartWatchMobile,
    lightingMobileBanner,
  ]

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  }

  return (
    <div className='container mx-auto rounded'>
      <div className='h-72 w-full hidden md:block'>
        {/* Desktop  */}
        <Carousel
          showDots={true}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          removeArrowOnDeviceType={['tablet', 'mobile']}
        >
          {desktopImages.map((img, index) => (
            <div key={index} className='w-full h-72 min-w-full min-h-full'>
              <img
                src={img}
                alt={`img${index}`}
                className='w-full h-full object-cover'
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Mobile */}

      <div className='h-72 w-full md:hidden'>
        {/* Desktop  */}
        <Carousel
          showDots={true}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          removeArrowOnDeviceType={['tablet', 'mobile']}
        >
          {mobileImages.map((img, index) => (
            <div key={index} className='w-full h-72 min-w-full min-h-full'>
              <img
                src={img}
                alt={`img${index}`}
                className='w-full h-full object-scale-down'
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default BannerProduct
