import BannerProduct from '../components/BannerProduct'
import ProductsByCategory from '../components/ProductsByCategory'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div className=''>
      <ProductsByCategory />
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
