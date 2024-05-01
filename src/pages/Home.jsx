import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import ProductsByCategory from '../components/ProductsByCategory'

const Home = () => {
  return (
    <div className='px-10'>
      <ProductsByCategory />
      <BannerProduct />
      <HorizontalCardProduct category={'smartphones'} heading={`Popular's Smartphones`} />
      <HorizontalCardProduct category={'sunglasses'} heading={`Popular's Sunglasses`} />
    </div>
  )
}

export default Home
