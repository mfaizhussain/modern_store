import { Link, NavLink, useNavigate } from 'react-router';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Icon from './Icon';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [term, setTerm] = useState(''); const navigate = useNavigate(); const { count } = useCart(); const { user, signOut } = useAuth();
  const submit = (event) => { event.preventDefault(); navigate(term.trim() ? `/shop?q=${encodeURIComponent(term)}` : '/shop'); };
  const navClass = ({ isActive }) => `transition hover:text-[#191c1e] ${isActive ? 'text-[#0058be]' : 'text-[#45464d]'}`;
  return <header className="sticky top-0 z-50 border-b border-[#c6c6cd] bg-[#f7f9fb]/95 backdrop-blur">
    <div className="mx-auto flex h-20 max-w-[1440px] items-center gap-4 px-5 md:px-12">
      <Link to="/" className="shrink-0 text-xl font-bold tracking-tighter">MODERN_STORE</Link>
      <form onSubmit={submit} className="relative hidden max-w-md flex-1 md:block"><Icon className="absolute left-3 top-2.5 text-[#45464d]">search</Icon><input value={term} onChange={e => setTerm(e.target.value)} className="w-full rounded-full border border-[#c6c6cd] bg-[#f2f4f6] py-2 pl-10 pr-4 outline-none focus:border-[#0058be]" placeholder="Search products..." /></form>
      <nav className="ml-auto hidden items-center gap-6 text-sm lg:flex"><NavLink to="/shop" className={navClass}>Shop All</NavLink><NavLink to="/shop?category=electronics" className={navClass}>Categories</NavLink><NavLink to="/shop?sort=rating" className={navClass}>New Arrivals</NavLink></nav>
      <div className="flex items-center gap-1 text-[#191c1e]"><Link to="/shop" aria-label="Search" className="rounded-full p-2 hover:bg-[#eceef0] md:hidden"><Icon>search</Icon></Link><Link to="/cart" aria-label="Cart" className="relative rounded-full p-2 hover:bg-[#eceef0]"><Icon>shopping_cart</Icon>{count > 0 && <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-[#0058be] px-1 text-center text-xs leading-5 text-white">{count}</span>}</Link>{user ? <button type="button" onClick={signOut} className="hidden text-xs font-bold uppercase tracking-wider text-[#0058be] sm:block">Sign out</button> : <Link to="/auth/login" aria-label="Account" className="hidden rounded-full p-2 hover:bg-[#eceef0] sm:block"><Icon>person</Icon></Link>}</div>
    </div>
  </header>;
}
