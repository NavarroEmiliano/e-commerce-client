import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useQuery } from '@tanstack/react-query'
import productsService from '../services/productsService'
import Skeleton from 'react-loading-skeleton'

const CategoryProduct = () => {
  const { categoryName } = useParams()

  const { isPending, data } = useQuery({
    queryKey: [categoryName],
    queryFn: () => productsService.getProductsByCategory(categoryName),
    enabled: !!categoryName,
  })

  const categorieSkeletons = new Array(4).fill(null)

  return (
    <div className='grid py-4 grid-cols-2 w-full place-items-center min-h-[calc(100vh-112px)]'>
      {isPending
        ? categorieSkeletons.map((_el, index) => {
            return (
              <div key={index} className='h-80 w-full max-w-[180px] rounded-lg'>
                <Skeleton className='h-full w-full' />
              </div>
            )
          })
        : data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
  )
}

export default CategoryProduct
