import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    const stockCount = Number(product.stock) || 0;

    if (stockCount === 0) {
      toast.error("This product is out of stock");
      return;
    }

    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      const newQuantity = existingProduct.quantity + quantity;

      if (newQuantity > stockCount) {
        toast.warning(`Only ${stockCount} item(s) available in stock`);
        return;
      }

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

      toast.success("Added to cart 🛒");
      return;
    }

    if (quantity > stockCount) {
      toast.warning(`Only ${stockCount} item(s) available in stock`);
      return;
    }

    setCartItems((prev) => [...prev, { ...product, quantity }]);
    toast.success("Added to cart 🛒");
  };

  const increaseQuantity = (id) => {
    const currentItem = cartItems.find((item) => item.id === id);

    if (!currentItem) return;

    const stockCount = Number(currentItem.stock) || 0;

    if (currentItem.quantity >= stockCount) {
      toast.warning(`Only ${stockCount} item(s) available in stock`);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.info("Removed from cart");
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
    toast.info("Cart cleared");
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}