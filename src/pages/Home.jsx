import BannerProduct from '../components/BannerProduct'
import RecommendedProductCarrousel from '../components/RecommendedProductCarrousel'

const Home = () => {
  return (
    <div className='px-2'>
      <BannerProduct />
      <RecommendedProductCarrousel
        category={'mobile-accessories'}
        heading={`Top's Mobile-Accessories`}
      />
      <RecommendedProductCarrousel
        category={'motorcycle'}
        heading={`Top's motorcycles`}
      />
    </div>
  )
}

export default Home
