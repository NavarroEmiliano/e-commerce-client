import { useQuery } from '@tanstack/react-query'
import productsService from '../services/productsService'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

const Categories = () => {
  const { isPending, data: categories } = useQuery({
    queryKey: ['oneProductPerCategory'],
    queryFn: productsService.getOneProductPerCategory,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })


  const categorieSkeletons = new Array(12).fill(null)

  return (
    <div className='w-full p-4 gap-4 place-items-center sm:px-16 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:px-28 xl:grid-cols-8 min-h-[calc(100vh-109px)]'>
      {isPending
        ? categorieSkeletons.map((_el, index) => {
            return (
              <div
                key={index}
                className='h-full max-h-44 w-full max-w-28 rounded-lg'
              >
                <Skeleton className='h-full' style={{borderRadius:'12px'}}/>
              </div>
            )
          })
        : categories?.map((prod) => (
            <Link
              to={`/categories/${prod.category}`}
              key={prod.id}
              className='h-[168px] w-28'
            >
              <div className='flex flex-col items-center h-full w-full rounded-lg shadow'>
                <div className='min-h-28 w-28'>
                  <img
                    src={prod.thumbnail}
                    alt={prod.title}
                    className='object-cover h-full w-full rounded-lg'
                  />
                </div>
                <div className='flex w-full h-full items-center justify-center capitalize text-center p-1'>
                  {prod.category}
                </div>
              </div>
            </Link>
          ))}
    </div>
  )
}

export default Categories
