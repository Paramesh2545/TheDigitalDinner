import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Load cart items from localStorage
const loadCartItems = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

const cartReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find(item => item._id === action.payload._id);
      if (existingItem) {
        newState = state.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newState = [...state, { ...action.payload, quantity: 1 }];
      }
      break;

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity < 1) {
        newState = state.filter(item => item._id !== action.payload.id);
      } else {
        newState = state.map(item =>
          item._id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
      break;

    case 'REMOVE_ITEM':
      newState = state.filter(item => item._id !== action.payload);
      break;

    case 'CLEAR_CART':
      newState = [];
      break;

    default:
      return state;
  }

  // Save to localStorage after each change
  localStorage.setItem('cart', JSON.stringify(newState));
  return newState;
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, null, loadCartItems);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Sync cart with localStorage when component mounts
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, []);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      cartTotal,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
