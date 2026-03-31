import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export const useCart = () => {
  const [cart, setCart] = useState([]);

  const loadCart = () => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }

  useEffect(() => {
    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    }
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      toast.error("Product already in cart");
    } else {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Product added to cart");
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }

  return {
    cart,
    addToCart
  }
}