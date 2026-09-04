import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useWishlist from '../hooks/useWishlist';
import useAuth from '../hooks/useAuth';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist, loading } = useWishlist();
  const { isAuthenticated } = useAuth();
  const inStock = product.stock > 0;
  
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(product.price);

  return (
    <div className="card h-100 border-0 radius-12 product-card position-relative transition-base" 
         onMouseEnter={(e) => e.currentTarget.classList.add('shadow-soft')}
         onMouseLeave={(e) => e.currentTarget.classList.remove('shadow-soft')}>
      
      {/* Product Image */}
      <Link to={`/product/${product._id}`} className="text-decoration-none">
        <div className="position-relative overflow-hidden" style={{ height: '220px', borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)' }}>
          <img
            src={product.images && product.images.length > 0 ? product.images[0].url : 'https://placehold.co/300x200/EEEEEE/31343C?text=No+Image'}
            className="w-100 h-100 object-fit-cover"
            style={{ transition: 'transform 0.5s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            alt={product.name}
          />
          
          {/* Wishlist Button */}
          <button
            className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow-sm d-flex align-items-center justify-content-center p-0"
            style={{ width: '36px', height: '36px', zIndex: 10, backgroundColor: 'rgba(255,255,255,0.9)' }}
            title={isInWishlist(product._id) ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isAuthenticated) {
                navigate('/login?redirect=/products');
                return;
              }
              toggleWishlist(product._id).catch(err => alert(err.toString()));
            }}
            disabled={loading}
          >
            <i className={`bi ${isInWishlist(product._id) ? 'bi-heart-fill text-danger' : 'bi-heart text-muted'}`}></i>
          </button>
          
          {/* Stock Badge */}
          {!inStock && (
            <span className="position-absolute top-0 start-0 m-3 badge bg-dark radius-sm shadow-sm px-2 py-1">
              Out of Stock
            </span>
          )}
        </div>
      </Link>

      {/* Product Details */}
      <div className="card-body p-4 d-flex flex-column">
        {/* Brand / Category */}
        <div className="text-muted-custom small text-uppercase fw-bold mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>
          {product.brand || (product.category && product.category.name) || 'Shopez'}
        </div>
        
        {/* Title */}
        <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
          <h5 className="card-title text-truncate fw-semibold mb-2" title={product.name} style={{ color: 'var(--color-text-primary)' }}>
            {product.name}
          </h5>
        </Link>

        {/* Rating */}
        <div className="mb-3 d-flex align-items-center">
          <div className="text-warning me-2" style={{ fontSize: '0.85rem' }}>
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={`bi ${i < Math.floor(product.averageRating || 0) ? 'bi-star-fill' : i < (product.averageRating || 0) ? 'bi-star-half' : 'bi-star'}`}
              ></i>
            ))}
          </div>
          <small className="text-muted-custom">({product.numReviews || 0} reviews)</small>
        </div>

        {/* Price & Action */}
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fs-5 fw-bold text-primary-custom">{formattedPrice}</span>
          <Link 
            to={`/product/${product._id}`}
            className="btn btn-sm btn-outline-primary radius-md px-3 fw-bold"
            title="View Details"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
