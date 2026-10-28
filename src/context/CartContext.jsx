/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'modern-store-cart';

// This context manages the shopping cart state
export function CartProvider({ children }) {
  // Initialize cart items from localStorage or empty array
  const [items, setItems] = useState(function () {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      } else {
        return [];
      }
    } catch (error) {
      console.log('Error reading cart from localStorage:', error);
      return [];
    }
  });

  // Save cart items to localStorage whenever they change
  useEffect(function () {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Add a product to the cart
  function addItem(product, quantity) {
    // Set default quantity if not provided
    if (quantity === undefined) {
      quantity = 1;
    }

    // Don't add invalid products or quantities
    if (!product || quantity <= 0) {
      return;
    }

    // Get current cart items
    var currentItems = items;

    // Check if product already exists in cart
    var existingItem = null;
    for (var i = 0; i < currentItems.length; i++) {
      if (currentItems[i].id === product.id) {
        existingItem = currentItems[i];
        break;
      }
    }

    var newItems;
    if (existingItem) {
      // If item exists, update its quantity
      newItems = [];
      for (var j = 0; j < currentItems.length; j++) {
        var item = currentItems[j];
        if (item.id === product.id) {
          // Create updated item with increased quantity
          var updatedItem = {};
          for (var key in item) {
            updatedItem[key] = item[key];
          }
          updatedItem.quantity = item.quantity + quantity;
          newItems.push(updatedItem);
        } else {
          newItems.push(item);
        }
      }
    } else {
      // If item doesn't exist, add it to cart
      var newItem = {};
      for (var key in product) {
        newItem[key] = product[key];
      }
      newItem.quantity = quantity;

      newItems = currentItems.concat([newItem]);
    }

    // Update state with new items
    setItems(newItems);

    console.log('Added item to cart:', product.title);
  }

  // Update the quantity of an item in the cart
  function updateQuantity(id, quantity) {
    // Don't set quantity to zero or negative
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    // Get current cart items
    var currentItems = items;
    var newItems = [];

    // Go through each item and update quantity if it matches the id
    for (var i = 0; i < currentItems.length; i++) {
      var item = currentItems[i];
      if (item.id === id) {
        // Create updated item with new quantity
        var updatedItem = {};
        for (var key in item) {
          updatedItem[key] = item[key];
        }
        updatedItem.quantity = quantity;
        newItems.push(updatedItem);
      } else {
        newItems.push(item);
      }
    }

    // Update state
    setItems(newItems);

    console.log('Updated quantity for item ID:', id, 'to:', quantity);
  }

  // Remove an item from the cart by its ID
  function removeItem(id) {
    // Get current cart items
    var currentItems = items;
    var newItems = [];

    // Add all items except the one with matching ID
    for (var i = 0; i < currentItems.length; i++) {
      var item = currentItems[i];
      if (item.id !== id) {
        newItems.push(item);
      }
    }

    // Update state
    setItems(newItems);

    console.log('Removed item from cart with ID:', id);
  }

  // Clear all items from the cart
  function clearCart() {
    setItems([]);
    console.log('Cart cleared');
  }

  // Calculate total number of items in cart
  function calculateCartCount() {
    var total = 0;
    for (var i = 0; i < items.length; i++) {
      total = total + items[i].quantity;
    }
    return total;
  }

  var count = calculateCartCount();

  // Create value object to pass to context consumers
  var value = {
    items: items,
    count: count,
    addItem: addItem,
    updateQuantity: updateQuantity,
    removeItem: removeItem,
    clearCart: clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook to use the cart context
function useCart() {
  return useContext(CartContext);
}

export { useCart };
