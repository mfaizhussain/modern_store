import { Link, NavLink, useNavigate } from 'react-router';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Icon from './Icon';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  // State for search input
  var termState = useState('');
  var term = termState[0];
  var setTerm = termState[1];

  // Navigation hook
  var navigate = useNavigate();

  // Cart context
  var cartContext = useCart();
  var count = cartContext.count;

  // Auth context
  var authContext = useAuth();
  var user = authContext.user;
  var signOut = authContext.signOut;

  // Form submit handler
  function submit(event) {
    event.preventDefault();
    var trimmedTerm = term.trim();
    if (trimmedTerm !== '') {
      navigate('/shop?q=' + encodeURIComponent(trimmedTerm));
    } else {
      navigate('/shop');
    }
  }

  // Function to get nav link class based on active state
  function getNavClass(isActive) {
    var baseClass = 'transition hover:text-[#191c1e]';
    if (isActive) {
      return baseClass + ' text-[#0058be]';
    } else {
      return baseClass + ' text-[#45464d]';
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#c6c6cd] bg-[#f7f9fb]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center gap-4 px-5 md:px-12">
        {/* Logo */}
        <Link to="/" className="shrink-0 text-xl font-bold tracking-tighter">
          MODERN_STORE
        </Link>

        {/* Search form (hidden on mobile) */}
        <form onSubmit={submit} className="relative hidden max-w-md flex-1 md:block">
          <Icon className="absolute left-3 top-2.5 text-[#45464d]">search</Icon>
          <input
            value={term}
            onChange={function (e) {
              setTerm(e.target.value);
            }}
            className="w-full rounded-full border border-[#c6c6cd] bg-[#f2f4f6] py-2 pl-10 pr-4 outline-none focus:border-[#0058be]"
            placeholder="Search products..."
          />
        </form>

        {/* Navigation links (hidden on mobile) */}
        <nav className="ml-auto hidden items-center gap-6 text-sm lg:flex">
          <NavLink to="/shop" className={getNavClass(false)}>
            Shop All
          </NavLink>
          <NavLink to="/shop?category=electronics" className={getNavClass(false)}>
            Categories
          </NavLink>
          <NavLink to="/shop?sort=rating" className={getNavClass(false)}>
            New Arrivals
          </NavLink>
        </nav>

        {/* Action icons (search, cart, user) */}
        <div className="flex items-center gap-1 text-[#191c1e]">
          {/* Search icon (mobile only) */}
          <Link to="/shop" aria-label="Search" className="rounded-full p-2 hover:bg-[#eceef0] md:hidden">
            <Icon>search</Icon>
          </Link>

          {/* Cart icon */}
          <Link to="/cart" aria-label="Cart" className="relative rounded-full p-2 hover:bg-[#eceef0]">
            <Icon>shopping_cart</Icon>
            {/* Show item count if cart has items */}
            {
              function () {
                if (count > 0) {
                  return (
                    <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-[#0058be] px-1 text-center text-xs leading-5 text-white">
                      {count}
                    </span>
                  );
                } else {
                  return null;
                }
              }()
            }
          </Link>

          {/* User actions (sign out or login) */}
          {
            function () {
              if (user) {
                // Show sign out button if user is logged in
                return (
                  <button
                    type="button"
                    onClick={signOut}
                    className="hidden text-xs font-bold uppercase tracking-wider text-[#0058be] sm:block"
                  >
                    Sign out
                  </button>
                );
              } else {
                // Show login link if user is not logged in
                return (
                  <Link
                    to="/auth/login"
                    aria-label="Account"
                    className="hidden rounded-full p-2 hover:bg-[#eceef0] sm:block"
                  >
                    <Icon>person</Icon>
                  </Link>
                );
              }
            }()
          }
        </div>
      </div>
    </header>
  );
}
