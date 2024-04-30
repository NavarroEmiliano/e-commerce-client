import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
  const {categoryName} = useParams()

  console.log(categoryName)
  return <div>{categoryName}</div>
}

export default CategoryProduct
