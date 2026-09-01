import { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_WISHLIST': {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case 'LOAD_WISHLIST':
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      dispatch({ type: 'LOAD_WISHLIST', payload: JSON.parse(saved) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.items));
  }, [state.items]);

  const toggleWishlist = (product) =>
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });

  const isInWishlist = (id) => state.items.some(item => item.id === id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist: state.items,
        toggleWishlist,
        isInWishlist,
        wishlistCount: state.items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};
