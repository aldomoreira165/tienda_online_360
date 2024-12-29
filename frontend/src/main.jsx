import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './contexts/cart.jsx';

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>,
)
