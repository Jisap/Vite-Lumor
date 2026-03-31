import { useEffect, useState, useRef } from "react";
import PageBanner from "../components/ui/PageBanner";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import MainBtn from "../components/ui/Buttons/MainBtn";


gsap.registerPlugin(ScrollTrigger);

const Wishlist = () => {

  const [wishlist, setWishlist] = useState([]); // lista de productos guardados como favoritos 
  const [selected, setSelected] = useState([]); // IDs de productos del wishlist marcados para añadir al carrito

  const loadWishlist = () => {
    const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];    // Obtiene el wishlist del localStorage
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];            // Obtiene el carrito del localStorage

    const preSelected = wishlistData
      .filter((item) => cartData.some((cartItem) => cartItem.id === item.id))   // Filtra los productos del wishlist que YA están en el carrito
      .map((item) => item.id);                                                  // Extrae solo los IDs de esos productos

    setWishlist(wishlistData);                                                  // Actualiza el estado del wishlist
    setSelected(preSelected);                                                   // Pre-marca como seleccionados los productos que ya están en el carrito
  }

  useEffect(() => {
    loadWishlist();
    window.addEventListener("wishlistUpdated", loadWishlist);                   // Re-sincroniza el estado cuando el wishlist cambia (desde otro componente)
    return () => window.removeEventListener("wishlistUpdated", loadWishlist);
  }, []);

  const removeProduct = (id) => {                                               // Elimina un producto del wishlist permanentemente
    const updated = wishlist.filter((item) => item.id !== id);                  // Reconstruye el wishlist sin el producto eliminado
    localStorage.setItem("wishlist", JSON.stringify(updated));                  // Persiste el wishlist actualizado en localStorage
    setWishlist(updated);                                                       // Actualiza el estado del wishlist
    setSelected((prev) => prev.filter((item) => item !== id));                  // Si estaba marcado como seleccionado, lo desmarca también
    toast.success("Product removed from wishlist");
    window.dispatchEvent(new Event("wishlistUpdated"));                         // Notifica a otros componentes que el wishlist cambió
  }

  const toggleSelect = (id) => {                                                // Marca o desmarca un producto del wishlist para añadirlo/quitarlo del carrito
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (selected.includes(id)) {                                                // Si el producto YA estaba seleccionado (y por tanto en el carrito)...
      const updatedSelected = selected.filter((item) => item !== id);           // Lo desmarca de la selección
      setSelected(updatedSelected);

      cart = cart.filter((item) => item.id !== id);                             // Lo elimina también del carrito
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Product removed from cart");
      window.dispatchEvent(new Event("cartUpdated"));                           // Notifica a otros componentes que el carrito cambió
    } else {                                                                    // Si el producto NO estaba seleccionado...
      setSelected([...selected, id]);                                           // Lo añade a la selección (sin añadirlo aún al carrito)
    }
  }

  const addToCart = (product) => {                                              // Añade un producto concreto al carrito de forma individual
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exist = cart.find((item) => item.id === product.id);                  // Comprueba si el producto ya existe en el carrito

    if (exist) {
      toast.error("Product already in cart");
      return;
    }

    cart.push(product);                                                         // Añade el producto al carrito
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Product added to cart");
    window.dispatchEvent(new Event("cartUpdated"));
  }

  const addSelectedToCart = () => {                                             // Añade al carrito todos los productos marcados como seleccionados
    if (selected.length === 0) {
      toast.error("Please select at least one product");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const selectedProducts = wishlist.filter((item) => selected.includes(item.id));  // Obtiene los objetos completos de los productos seleccionados

    let addedCount = 0;

    selectedProducts.forEach((product) => {
      const exist = cart.find((item) => item.id === product.id);                     // Evita duplicados: solo añade si no está ya en el carrito
      if (!exist) {
        cart.push(product);
        addedCount++;
      }
    })

    if (addedCount === 0) {                                                          // Si no se añadió ningún producto
      toast("Selected products already in cart");                                    // Mensaje de Todos los seleccionados ya estaban en el carrito"
      return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));                              // Se añade el producto al carrito
    toast.success(`${addedCount} product(s) added to cart`);                         // Mensaje de se añadieron los productos al carrito
    window.dispatchEvent(new Event("cartUpdated"));                                  // Se dispara un evento para que otros componentes se actualicen
  }

  const addAllToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    wishlist.forEach((product) => {
      const exist = cart.find((item) => item.id === product.id);
      if (!exist) {
        cart.push(product);
      }
    })

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("All products added to cart");
    window.dispatchEvent(new Event("cartUpdated"));
  }

  const wishlistRef = useRef();

  useEffect(() => {
    if (!wishlistRef.current) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(wishlistRef);

      gsap.from(q(".wishlist-item"), {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".wishlist-section"),
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
      });

      gsap.from(q(".wishlist-empty"), {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: q(".wishlist-empty"),
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
      });

      gsap.from(q(".wishlist-actions"), {
        y: 50,
        opacity: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".wishlist-actions"),
          start: "top 90%",
          toggleActions: "play none none reverse"
        },
      });

      gsap.from(q(".wishlist-btn"), {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".wishlist-btn"),
          start: "top 90%",
          toggleActions: "play none none reverse"
        },
      });

      gsap.from(q("wishlist-head"), {
        y: -40,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".wishlist-head"),
          start: "top 90%",
          toggleActions: "play none none reverse"
        },
      });

      gsap.from(q(".wishlist-th"), {
        x: -30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".wishlist-th"),
          start: "top 90%",
          toggleActions: "play none none reverse"
        },
      });
    }, wishlistRef);

    return () => ctx.revert();

  }, [wishlist])

  return (

    <>
      <PageBanner
        title="Wishlist"
        currentPage="Wishlist"
      />

      <div ref={wishlistRef} className='container mx-auto py-[8%] px-[4%]'>
        {wishlist.length === 0 ? (
          <p className="text-center text-lg bg-gray-50 shadow-md py-5 wishlist-empty">
            No products in wishlist
          </p>
        ) : (
          <>
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black text-white wishlist-head">
                  <tr>
                    <th className="p-4 wishlist-th"></th>
                    <th className="p-4 text-left font-medium wishlist-th">Product</th>
                    <th className="p-4 text-left font-medium wishlist-th">Price</th>
                    <th className="p-4 text-left font-medium wishlist-th">Stock</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>

                <tbody>
                  {wishlist.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 wishlist-item">
                      <td className="text-center border-r border-gray-200">
                        <input
                          type="checkbox"
                          checked={selected.includes(item.id)}
                          onChange={() => toggleSelect(item.id)}
                          className="cursor-pointer"
                        />
                      </td>

                      <td className="flex items-center px-10 gap-4 py-6 border-r border-gray-200">
                        <button
                          className="cursor-pointer"
                          onClick={() => removeProduct(item.id)}
                        >
                          <X size={20} />
                        </button>

                        <img
                          src={item.image1}
                          alt={item.name}
                          className='w-20 h-20 object-cover'
                        />

                        <p className="font-semibold">
                          {item.name}
                        </p>
                      </td>

                      <td className="text-center border-r bg-gray-200">
                        ${item.price}.00
                      </td>

                      <td className="text-green-600 text-center border-r border-gray-200">
                        In Stock
                      </td>

                      <td className="text-right">
                        <MainBtn
                          type="button"
                          text="Add to Cart"
                          onClick={() => addProductToCart(item)}
                          className="bg-transparent! border! shadow-none! rounded-sm!"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden">

            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Wishlist;