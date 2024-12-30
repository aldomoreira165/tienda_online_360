import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);

  const addToCart = (product) => {
    setCart((prevCart) => {
      return [...prevCart, { ...product, cantidad_orden: 1 }];
    });
  };

  const removeFromCart = (product) => {
    setCart((prevState) =>
      prevState.filter((p) => p.idProductos !== product.idProductos)
    );
  };

  const incrementProduct = (product) => {
    setCart((prevState) => {
      return prevState.map((p) => {
        if (p.idProductos === product.idProductos) {
          return { ...p, cantidad_orden: p.cantidad_orden + 1 };
        }
        return p;
      });
    });
  };

  const decrementProduct = (product) => {
    setCart((prevState) => {
      return prevState.map((p) => {
        if (p.idProductos === product.idProductos) {
          return { ...p, cantidad_orden: p.cantidad_orden - 1 };
        }
        return p;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementProduct,
        decrementProduct,
        clearCart,
        totalCart,
        setTotalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
