import { useContext } from "react";
import { CartContext } from "./../contexts/cart";

export default function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }

  return context;
}