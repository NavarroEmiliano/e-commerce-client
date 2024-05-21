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
    <div className='flex mx-auto my-8 px-4 relative'>
      <div className='flex w-full '>
        <div className='flex w-full flex-wrap justify-around gap-6'>
          {data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct
