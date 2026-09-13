/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
const CartContext = createContext(null);
const STORAGE_KEY = 'modern-store-cart';
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } });
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(items)), [items]);
  const value = useMemo(() => ({
    items, count: items.reduce((sum, item) => sum + item.quantity, 0),
    addItem(product, quantity = 1) { setItems(current => { const found = current.find(item => item.id === product.id); return found ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { ...product, quantity }]; }); },
    updateQuantity(id, quantity) { setItems(current => quantity < 1 ? current.filter(item => item.id !== id) : current.map(item => item.id === id ? { ...item, quantity } : item)); },
    removeItem(id) { setItems(current => current.filter(item => item.id !== id)); }, clearCart() { setItems([]); },
  }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);
