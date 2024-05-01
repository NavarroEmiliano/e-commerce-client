import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
  const {categoryName} = useParams()

  return <div>{categoryName}</div>
}

export default CategoryProduct
