import { RouterProvider } from 'react-router';
import { CartProvider } from './context/CartContext';
import { router } from './routes/AppRoutes';

export default function App() {
  return <CartProvider><RouterProvider router={router} /></CartProvider>;
}
