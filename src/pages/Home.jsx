import BannerProduct from '../components/BannerProduct'
import ProductsByCategory from '../components/ProductsByCategory'

const Home = () => {
  return (
    <div className='w-[90%] mx-auto'>
      <ProductsByCategory />
      <BannerProduct />
    </div>
  )
}

export default Home
