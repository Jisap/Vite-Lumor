import { useEffect, useState } from "react";
import toast from "react-hot-toast";






export const useWishlist = (product) => {

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const whislist = JSON.parse(localStorage.getItem("wishlist")) || []; // Obtiene el wishlist del localStorage

    const exist = whislist.find((item) => item.id === product.id);       // Verifica si el producto existe en el wishlist

    setLiked(!!exist);                                                   // Actualiza el estado del like

  }, [product.id]);

  const toggleWishlist = () => {
    let whishlist = JSON.parse(localStorage.getItem("wishlist")) || [];  // Obtiene el wishlist del localStorage

    const exist = whishlist.find((item) => item.id === product.id);      // Verifica si el producto existe en el wishlist

    if (exist) {                                                         // Si el producto existe en el wishlist, lo elimina                           // Si el producto existe
      whishlist = whishlist.filter((item) => item.id !== product.id);    // Filtra el producto del wishlist
      localStorage.setItem("wishlist", JSON.stringify(whishlist));       // Actualiza el wishlist en el localStorage
      setLiked(false)                                                    // Actualiza el estado del like
      toast.success("Product removed from wishlist");
    } else {                                                               // Si el producto no existe
      whishlist.push(product);                                           // Agrega el producto al wishlist
      localStorage.setItem("wishlist", JSON.stringify(whishlist));       // Actualiza el wishlist en el localstorage
      setLiked(true)                                                     // Actualiza el estado del like
      toast.success("Product added to wishlist");
    }

    window.dispatchEvent(new Event("wishlistChanged"));                  // Dispara un evento para que otros componentes se actualicen

  }

  return {
    liked,
    toggleWishlist
  }

}
