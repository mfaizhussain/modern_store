import { RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { router } from './routes/AppRoutes';

// Main App component that wraps the application with providers
export default function App() {
  // The AuthProvider handles authentication state
  // The CartProvider handles shopping cart state
  // RouterProvider handles client-side routing
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}
