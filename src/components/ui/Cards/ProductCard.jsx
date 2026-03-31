import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom'
import { useCart } from '../../../hooks/useCart'
import { useWishlist } from '../../../hooks/useWishlist'
import { MoveRight, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {

  const { liked, toggleWishlist } = useWishlist(product);
  const { addToCart } = useCart();

  return (
    <>
      <div className='product-item relative product-card'>
        <div className='product-image relative rounded-sm overflow-hidden'>
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image1}
              alt={product.title}
              className='section-image' />
          </Link>

          <ul className='absolute top-[44%] left-[26%] w-fit h-fit space-x-3 product-icons z-4 flex justify-center items-center'>
            <li
              onClick={toggleWishlist}
              className='cursor-pointer bg-white p-2 rounded-full shadow'
            >
              {liked ? (
                <Icon icon="mdi:heart" className="text-red-500" width="24" />
              ) : (
                <Icon icon="mdi:heart-outline" width="24" />
              )}
            </li>

            <li
              onClick={() => addToCart(product)}
              className='cursor-pointer bg-white p-2 rounded-full shadow'
            >
              <ShoppingCart />
            </li>

            <li className='cursor-pointer bg-white p-2 rounded-full shadow'>
              <Link to={`/product/${product.id}`}>
                <MoveRight />
              </Link>
            </li>
          </ul>
        </div>

        <Link to={`/product/${product.id}`}>
          <div className='product-content p-4'>
            <h3 className='text-xl font-semibold tracking-wide pb-2'>
              {product.title}
            </h3>

            <p className='text-paragraph text-lg'>
              {product.oldprice > 0 && (
                <span className='line-through text.muted pe-2'>
                  ${product.oldprice.toFixed(2)}
                </span>
              )}

              ${product.price?.toFixed(2) || "0.00"}
            </p>
          </div>
        </Link>
      </div>
    </>
  )
}

export default ProductCard