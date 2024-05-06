import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import ProductsByCategory from '../components/ProductsByCategory'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div className=''>
      <ProductsByCategory />
      <BannerProduct />
      <HorizontalCardProduct
        category={'smartphones'}
        heading={`Top's Smartphones`}
      />
      <HorizontalCardProduct
        category={'sunglasses'}
        heading={`Tops's Sunglasses`}
      />
      <VerticalCardProduct category={'tops'} heading={`Top's`} />
    </div>
  )
}

export default Home
