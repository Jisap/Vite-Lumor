import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
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
        </div>
      </div>
    </>
  )
}

export default ProductCard