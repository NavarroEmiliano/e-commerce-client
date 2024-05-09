import BannerProduct from '../components/BannerProduct'
import CategoryCarousel from '../components/CategoryCarousel'
import RecommendedProductCarrousel from '../components/RecommendedProductCarrousel'

const Home = () => {
  return (
    <div>
      <CategoryCarousel />
      <BannerProduct />
      <RecommendedProductCarrousel
        category={'smartphones'}
        heading={`Top's Smartphones`}
      />
      <RecommendedProductCarrousel
        category={'motorcycle'}
        heading={`Top's motorcycles`}
      />
    </div>
  )
}

export default Home
