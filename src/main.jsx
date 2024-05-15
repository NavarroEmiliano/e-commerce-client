import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthContextProvider } from './context/AuthContext'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <PayPalScriptProvider
    options={{
      'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
    }}
  >
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthContextProvider>
  </PayPalScriptProvider>,
)
