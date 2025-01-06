import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './contexts/cart.jsx';
import { UserProvider } from './contexts/user.jsx';

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </UserProvider>
)
