import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AdminAllUsers from '../pages/AdminAllUsers'
import AdminAllProducts from '../pages/AdminAllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import PurchaseSuccessMessage from '../pages/PurchaseSuccessMessage'
import ViewPurchases from '../pages/ViewPurchases'
import ResetPassword from '../pages/ResetPassword'
import AllProducts from '../pages/AllProducts'
import AdminSoldProducts from '../pages/AdminSoldProducts'
import Categories from '../pages/Categories'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password/:id/:token', element: <ResetPassword /> },
      { path: 'sign-up', element: <SignUp /> },
      {
        path: 'all-products',
        element: <AllProducts />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'categories/:categoryName',
        element: <CategoryProduct />,
      },
      {
        path: 'product/:productId',
        element: <ProductDetails />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'search',
        element: <SearchProduct />,
      },
      {
        path: 'admin-panel',
        element: <AdminPanel />,
        children: [
          { path: 'all-users', element: <AdminAllUsers /> },
          { path: 'all-products', element: <AdminAllProducts /> },
          { path: 'sold-products', element: <AdminSoldProducts /> },
        ],
      },
      {
        path: 'purchase-success',
        element: <PurchaseSuccessMessage />,
      },
      {
        path: 'view-purchases',
        element: <ViewPurchases />,
      },
    ],
  },
])

export default router
