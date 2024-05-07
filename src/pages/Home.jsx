import BannerProduct from '../components/BannerProduct'
import CategoryCarousel from '../components/CategoryCarousel'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryCarousel />
      <BannerProduct />
      <VerticalCardProduct
        category={'smartphones'}
        heading={`Top's Smartphones`}
      />
      <VerticalCardProduct
        category={'motorcycle'}
        heading={`Top's motorcycles`}
      />
    </div>
  )
}

export default Home
