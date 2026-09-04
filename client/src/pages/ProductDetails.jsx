import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import Loader from '../components/Loader';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import useWishlist from '../hooks/useWishlist';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState('');
  
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toggleWishlist, isInWishlist, loading: wishlistLoading } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0].url);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/product/' + id);
      return;
    }
    
    try {
      await addToCart(product._id, qty);
      navigate('/cart');
    } catch (err) {
      alert(err.toString());
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Loader />
    </div>
  );
  if (error) return <div className="alert alert-danger m-5 radius-12 shadow-sm border-0">{error.toString()}</div>;
  if (!product) return <div className="alert alert-info m-5 radius-12 shadow-sm border-0">Product not found</div>;

  const inStock = product.stock > 0;
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(product.price);

  return (
    <div className="section-padding bg-surface" style={{ minHeight: '80vh' }}>
      <div className="container">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted-custom">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/products" className="text-decoration-none text-muted-custom">Products</Link></li>
            <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="row g-5">
          {/* Images Column */}
          <div className="col-lg-5">
            <div className="card border-0 radius-12 overflow-hidden mb-3 bg-light d-flex justify-content-center align-items-center position-relative" style={{ height: '450px' }}>
              <img 
                src={mainImage || 'https://placehold.co/500x500/EEEEEE/31343C?text=No+Image'} 
                alt={product.name} 
                className="img-fluid object-fit-contain w-100 h-100 p-4" 
                style={{ mixBlendMode: 'multiply' }}
              />
              {!inStock && (
                <span className="position-absolute top-0 start-0 m-3 badge bg-dark radius-sm px-3 py-2 fs-6">
                  Out of Stock
                </span>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="d-flex gap-3 overflow-auto py-2 hide-scrollbar">
                {product.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`radius-12 overflow-hidden cursor-pointer transition-base ${mainImage === img.url ? 'border border-2 border-primary shadow-sm' : 'border border-light opacity-75 hover-opacity-100'}`}
                    style={{ width: '80px', height: '80px', flexShrink: 0, backgroundColor: 'var(--color-bg-body)' }}
                    onClick={() => setMainImage(img.url)}
                  >
                    <img src={img.url} className="w-100 h-100 object-fit-cover" alt={`Thumbnail ${idx+1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="col-lg-4">
            <div className="d-flex align-items-center mb-2">
              <span className="badge-accent me-2">{product.category?.name || 'Category'}</span>
              <span className="text-muted-custom small fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>{product.brand}</span>
            </div>
            
            <h1 className="fw-bold mb-3" style={{ fontSize: '2rem', letterSpacing: '-0.5px' }}>{product.name}</h1>
            
            {/* Rating */}
            <div className="d-flex align-items-center mb-4">
              <div className="text-warning fs-5 me-2">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i} 
                    className={`bi ${i < Math.floor(product.averageRating || 0) ? 'bi-star-fill' : i < (product.averageRating || 0) ? 'bi-star-half' : 'bi-star'}`}
                  ></i>
                ))}
              </div>
              <span className="text-muted-custom fw-medium">{Number(product.averageRating || 0).toFixed(1)} rating ({product.numReviews || 0} reviews)</span>
            </div>

            <p className="lead text-secondary mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
              {product.description}
            </p>

            {product.specifications && product.specifications.length > 0 && (
              <div className="mt-5">
                <h5 className="fw-bold mb-4 text-dark d-flex align-items-center">
                  <i className="bi bi-info-circle me-2 text-primary-custom"></i>
                  Technical Specifications
                </h5>
                <div className="border border-light radius-12 overflow-hidden bg-white shadow-sm">
                  {product.specifications.map((spec, idx) => (
                    <div 
                      key={idx} 
                      className={`d-flex justify-content-between align-items-center p-3 ${idx % 2 === 0 ? 'bg-light bg-opacity-50' : 'bg-white'}`}
                      style={{ borderBottom: idx < product.specifications.length - 1 ? '1px solid var(--color-border)' : 'none' }}
                    >
                      <span className="text-secondary fw-semibold small">{spec.name}</span>
                      <span className="text-dark fw-medium small text-end ms-3">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Column */}
          <div className="col-lg-3">
            <div className="card shadow-soft border-0 radius-12 sticky-top" style={{ top: '100px' }}>
              <div className="card-body p-4">
                <h2 className="text-primary-custom fw-bold mb-4">{formattedPrice}</h2>
                
                <div className="d-flex justify-content-between align-items-center mb-4 pb-4 border-bottom">
                  <span className="text-secondary fw-medium">Availability</span>
                  <span className={`badge ${inStock ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'} rounded-pill px-3 py-2 fw-bold`}>
                    <i className={`bi ${inStock ? 'bi-check-circle' : 'bi-x-circle'} me-1`}></i>
                    {inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {inStock && (
                  <div className="mb-4">
                    <label className="form-label text-secondary fw-medium small mb-2">Quantity</label>
                    <select 
                      className="form-select border-0 bg-light radius-md fw-bold py-2 px-3 shadow-none" 
                      value={qty} 
                      onChange={(e) => setQty(Number(e.target.value))}
                      style={{ cursor: 'pointer' }}
                    >
                      {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="d-grid gap-3">
                  <button 
                    className="btn btn-primary py-3 radius-md fw-bold d-flex align-items-center justify-content-center"
                    disabled={!inStock}
                    onClick={handleAddToCart}
                  >
                    <i className="bi bi-cart-plus me-2 fs-5"></i> Add to Cart
                  </button>
                  
                  <button 
                    className={`btn py-3 radius-md fw-bold d-flex align-items-center justify-content-center ${isInWishlist(product._id) ? 'btn-danger bg-opacity-10 text-danger border-0' : 'btn-light text-secondary border-0'}`}
                    disabled={wishlistLoading}
                    onClick={() => {
                      if (!isAuthenticated) {
                        navigate('/login?redirect=/product/' + id);
                        return;
                      }
                      toggleWishlist(product._id).catch(err => alert(err.toString()));
                    }}
                  >
                    <i className={`bi ${isInWishlist(product._id) ? 'bi-heart-fill' : 'bi-heart'} me-2 fs-5`}></i> 
                    {isInWishlist(product._id) ? 'Saved to Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
                
                <div className="mt-4 pt-3 border-top text-center">
                  <div className="d-flex align-items-center justify-content-center text-muted-custom small mb-2">
                    <i className="bi bi-shield-lock me-2"></i> Secure transaction
                  </div>
                  <div className="d-flex align-items-center justify-content-center text-muted-custom small">
                    <i className="bi bi-box-seam me-2"></i> Dispatches in 24 hours
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
