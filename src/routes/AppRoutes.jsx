import { createBrowserRouter } from 'react-router';
import AuthLayout from '../layouts/AuthLayout';
import StoreLayout from '../layouts/StoreLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import ErrorPage from '../pages/ErrorPage';
import { getProduct, getProducts } from '../api/products';

export const router = createBrowserRouter([
  { path: '/', element: <StoreLayout />, errorElement: <ErrorPage />, children: [
    { index: true, element: <Home />, loader: () => getProducts() },
    { path: 'shop', element: <Shop />, loader: () => getProducts() },
    { path: 'products/:productId', element: <ProductDetail />, loader: ({ params }) => getProduct(params.productId) },
    { path: 'cart', element: <Cart /> },
  ] },
  { path: '/auth', element: <AuthLayout />, children: [
    { path: 'login', element: <Login /> }, { path: 'register', element: <Register /> },
  ] },
]);
