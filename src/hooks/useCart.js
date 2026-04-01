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

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      toast.error("Product already in cart");
    } else {
      cart.push({ ...product, quantity: 1 });                         // Agrega el producto con cantidad inicial 1
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Product added to cart");
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }

  const updateQuantity = (id, quantity) => {                          // Función para actualizar la cantidad de un producto
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];   // Obtiene los items del localStorage
    const index = cartItems.findIndex((item) => item.id === id);      // Busca el índice del producto
    if (index !== -1) {                                               // Si el producto existe
      cartItems[index].quantity = quantity;                           // Actualiza la propiedad quantity
      localStorage.setItem("cart", JSON.stringify(cartItems));        // Guarda los cambios en localStorage
      window.dispatchEvent(new Event("cartUpdated"));                 // Notifica el cambio globalmente
    }
  }

  const removeFromCart = (id) => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];     // Obtiene la data del localStorage y la convierte a JSON
    cartItems = cartItems.filter((item) => item.id !== id);             // Filtra el producto del carrito
    localStorage.setItem("cart", JSON.stringify(cartItems));            // Guarda la data del carrito en el localStorage
    toast.error("Product removed from cart");                           // Muestra un mensaje de éxito
    window.dispatchEvent(new Event("cartUpdated"));                     // Dispara el evento cartUpdated
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity
  }
}