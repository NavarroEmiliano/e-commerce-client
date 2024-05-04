import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import oneProductByCategory from "../helpers/oneProductByCategory"

const ProductsByCategory = () => {
  const products = useSelector((state) => state.products)
  const [loading, setLoading] = useState(true)
  const [productsByCategory, setProductsByCategory] = useState([])

  useEffect(() => {
    const productsByCategory = oneProductByCategory(products)
    setProductsByCategory(productsByCategory)
    if (productsByCategory.length) setLoading(false)
  }, [products])

  return (
    <div className="container mx-auto py-4 ">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex justify-between gap-6 overflow-x-scroll">
          {productsByCategory.map((product) => {
            return (
              <Link
                to={`product-category/${product?.category}`}
                className="flex flex-col  h-full cursor-pointer"
                key={product.id}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden ">
                  <img
                    className="w-full h-full object-cover"
                    src={product.images[0]}
                    alt={product.category}
                  />
                </div>
                <p className="text-center capitalize">{product?.category}</p>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ProductsByCategory
