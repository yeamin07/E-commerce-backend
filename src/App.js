import './App.css'
import Router from './routes/Router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AuthContextProvider from './contexts/Auth'
import CartProvider from './contexts/cart'

const client = new QueryClient()

const App = () => {
  return (
    <div className='App'>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthContextProvider>
          <CartProvider>
            <Router />
          </CartProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App














