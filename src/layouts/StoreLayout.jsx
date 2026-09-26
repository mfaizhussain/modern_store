import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function StoreLayout() { return <div className="min-h-screen bg-black text-white"><Header /><Outlet /><Footer /></div>; }
