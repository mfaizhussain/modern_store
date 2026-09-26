import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function StoreLayout() { return <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e]"><Header /><Outlet /><Footer /></div>; }
