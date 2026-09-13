import { RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { router } from './routes/AppRoutes';

export default function App() {
  return <AuthProvider><CartProvider><RouterProvider router={router} /></CartProvider></AuthProvider>;
}
