import { Outlet } from 'react-router';
import loginImage from '../assets/loginImage.jpg';

export default function AuthLayout() {
  return <main className="min-h-screen bg-[#f7f9fb] lg:grid lg:grid-cols-2">
    <aside className="relative hidden overflow-hidden lg:block"><img src={loginImage} alt="Modern living room" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-[#131b2e]/20" /><span className="absolute left-16 top-16 text-2xl font-bold tracking-tighter text-white">MODERN_STORE</span></aside>
    <section className="flex min-h-screen items-center justify-center bg-white px-6 py-12 sm:px-12 lg:px-20"><Outlet /></section>
  </main>;
}
