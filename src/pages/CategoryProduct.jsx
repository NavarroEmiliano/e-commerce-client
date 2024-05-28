import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useQuery } from '@tanstack/react-query'
import productsService from '../services/productsService'

const CategoryProduct = () => {
  const { categoryName } = useParams()

  /*   const [sortByPrice, setSortByPrice] = useState('')
   */

  const { isPending, error, data } = useQuery({
    queryKey: [categoryName],
    queryFn: () => productsService.getProductsByCategory(categoryName),
    enabled: !!categoryName,
  })

  /*   const filteredProducts = [...productsByCategory]
    .sort((a, b) => {
      if (sortByPrice === 'ASC') {
        return a.price - b.price
      } else if (sortByPrice === 'DESC') {
        return b.price - a.price
      }
      return 0
    })
    .filter((product) => selectCategory[product.category]) */

  /*   const handleSortByChange = (e) => {
    setSortByPrice(e.target.value)
  } */

  return (
    <div className='grid grid-cols-2 my-8'>
      {data?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default CategoryProduct
