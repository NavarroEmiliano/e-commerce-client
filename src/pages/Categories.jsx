import { useQuery } from '@tanstack/react-query'
import productsService from '../services/productsService'
import { Link } from 'react-router-dom'

const Categories = () => {
  const { isPending, data: categories } = useQuery({
    queryKey: ['oneProductPerCategory'],
    queryFn: productsService.getOneProductPerCategory,
    refetchOnWindowFocus: false,
  })

  return (
    <div className='w-full mx-auto grid grid-cols-3 gap-4 min-h-screen p-4'>
      {categories?.map((prod) => (
        <Link to={`/categories/${prod.category}`} key={prod.id}>
          <div className='flex mx-auto flex-col items-center h-full max-h-44 w-full max-w-28 rounded-lg shadow'>
            <div className='h-28 w-28'>
              <img
                src={prod.images[0]}
                alt={prod.title}
                className='object-container h-full w-full rounded-lg'
              />
            </div>
            <div className='flex items-center justify-center capitalize text-center p-1'>
              {prod.category}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Categories
