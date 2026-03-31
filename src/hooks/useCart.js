import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export const useCart = () => {
  const [cart, setCart] = useState([]);

  const loadCart = () => {                                            // Función que:                                          
    const data = JSON.parse(localStorage.getItem("cart")) || [];      // Obtiene la data del localStorage y la convierte a JSON
    setCart(data);                                                    // Establece el estado con la data del localStorage
  }

  useEffect(() => {
    loadCart();                                                        // Carga la data del localStorage y establece el estado
    window.addEventListener("cartUpdated", loadCart);                  // Escucha el evento cartUpdated y carga la data del localStorage actualizada
    return () => {
      window.removeEventListener("cartUpdated", loadCart);             // Elimina el evento cartUpdated
    }
  }, []);

  const addToCart = (product) => {                                     // Función que recibe un producto
    let cart = JSON.parse(localStorage.getItem("cart")) || [];         // Obtiene la data del localStorage y la convierte a JSON
    const exist = cart.find((item) => item.id === product.id);         // Busca si el producto ya existe en el carrito

    if (exist) {                                                        // Si el producto ya existe en el carrito, muestra un mensaje de error
      toast.error("Product already in cart");                           // Muestra un mensaje de error
    } else {                                                            // Si el producto no existe en el carrito, lo agrega
      cart.push(product);                                               // Agrega el producto al carrito
      localStorage.setItem("cart", JSON.stringify(cart));               // Guarda la data del carrito en el localStorage
      toast.success("Product added to cart");                           // Muestra un mensaje de éxito
      window.dispatchEvent(new Event("cartUpdated"));                   // Dispara el evento cartUpdated
    }
  }

  const removeFromCart = (id) => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];     // Obtiene la data del localStorage y la convierte a JSON
    cartItems = cartItems.filter((item) => item.id !== id);             // Filtra el producto del carrito
    localStorage.setItem("cart", JSON.stringify(cartItems));            // Guarda la data del carrito en el localStorage
    toast.error("Product removed from cart");                         // Muestra un mensaje de éxito
    window.dispatchEvent(new Event("cartUpdated"));                     // Dispara el evento cartUpdated
  }

  return {
    cart,
    addToCart,
    removeFromCart
  }
}