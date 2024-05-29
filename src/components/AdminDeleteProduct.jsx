/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CiWarning } from 'react-icons/ci'
import { IoCloseOutline } from 'react-icons/io5'
import productsService from '../services/productsService'
import { toast } from 'react-toastify'

const AdminDeleteProduct = ({ productId, closeDelete }) => {
  const queryClient = useQueryClient()
  const deleteProductMutation = useMutation({
    mutationFn: productsService.deleteProduct,
    onSuccess: (data) => {
      toast.success(data)
      const products = queryClient.getQueryData(['allProducts'])
      queryClient.setQueryData(
        ['allProducts'],
        products.filter((product) => product.id !== productId),
      )
    },
    onError: (error) => {
      toast.error(error.response.data.data)
    },
  })

  const handleDeleteProduct = () => {
    deleteProductMutation.mutate(productId)
    closeDelete()
  }

  return (
    <div className='fixed w-full h-full top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black/65'>
      <div className='flex flex-col gap-6 justify-between bg-white p-2 rounded-lg w-full max-w-sm'>
        <button className='text-3xl ml-auto hover:scale-110 duration-75'>
          <IoCloseOutline onClick={closeDelete} />
        </button>
        <div className='text-9xl text-red-600 mx-auto'>
          <CiWarning />
        </div>
        <strong className='text-center'>
          Are you sure you want to delete this product?
        </strong>
        <button
          className='w-full bg-red-600 p-3 rounded-lg text-white hover:bg-red-700 active:scale-95 duration-75'
          onClick={handleDeleteProduct}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default AdminDeleteProduct
