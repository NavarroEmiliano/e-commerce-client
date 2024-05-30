import Carousel from 'react-multi-carousel'

// Desktop banners
import watchBanner from '../assets/watch-banner.jpg'
import sunglassesBanner from '../assets/sunglasses-banner.jpeg'
import shoesBanner from '../assets/shoes-banner.jpg'
import fashionBagBanner from '../assets/fashion-bag-banner.jpg'

const BannerProduct = () => {
  const desktopImages = [
    watchBanner,
    sunglassesBanner,
    shoesBanner,
    fashionBagBanner,
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
    <div className='container mx-auto mt-4 sm:px-14 lg:px-16'>
      <div className='h-52 md:h-72 w-full'>
        <Carousel
          showDots={true}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          removeArrowOnDeviceType={['tablet', 'mobile']}
          className='relative z-0'
        >
          {desktopImages.map((img, index) => (
            <div
              key={index}
              className='w-full h-52 md:h-72 min-w-full min-h-full'
            >
              <img
                src={img}
                alt={`img${index}`}
                className='w-full h-full object-cover rounded-lg'
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default BannerProduct
