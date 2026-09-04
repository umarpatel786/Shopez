import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import CartItem from '../components/CartItem';
import Loader from '../components/Loader';

const Cart = () => {
  const { cart, loading, updateQuantity, removeFromCart, applyCoupon, moveToSavedForLater, moveToCart } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (loading && (!cart || !cart.items)) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Loader />
      </div>
    );
  }

  const isEmpty = !cart || !cart.items || cart.items.length === 0;
  const hasSavedForLater = cart && cart.savedForLater && cart.savedForLater.length > 0;

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponError('');
    setCouponSuccess('');
    try {
      await applyCoupon(couponCode);
      setCouponSuccess('Coupon applied successfully!');
    } catch (err) {
      setCouponError(err?.response?.data?.message || 'Invalid coupon');
    }
  };

  const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price || 0);

  const formattedSubtotal = formatPrice(cart?.subTotal);
  const formattedDiscount = formatPrice(cart?.discountPrice);
  const formattedTax = formatPrice(cart?.taxPrice);
  const formattedShipping = cart?.shippingPrice === 0 ? 'Free' : formatPrice(cart?.shippingPrice);
  const formattedTotal = formatPrice(cart?.totalPrice);

  return (
    <div className="section-padding bg-surface" style={{ minHeight: '80vh' }}>
      <div className="container">
        
        <div className="d-flex align-items-center mb-5 pb-3 border-bottom">
          <h2 className="fw-bold m-0" style={{ letterSpacing: '-0.5px' }}>Shopping Cart</h2>
          {!isEmpty && (
            <span className="badge bg-primary rounded-pill ms-3 fs-6 px-3">{cart.itemCount} Items</span>
          )}
        </div>
        
        {isEmpty ? (
          <div className="text-center py-5 my-5">
            <div className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle mb-4" style={{ width: '100px', height: '100px' }}>
              <i className="bi bi-cart-x fs-1 text-muted-custom"></i>
            </div>
            <h3 className="fw-bold mb-3">Your cart is empty</h3>
            <p className="text-muted-custom mb-4 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Discover our premium collections and find something you love.</p>
            <Link to="/products" className="btn btn-primary btn-lg px-5 radius-md fw-bold shadow-sm hover-scale">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="row g-5">
            {/* Cart Items Column */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm radius-12 mb-4 overflow-hidden">
                <div className="card-header bg-white border-bottom py-4 px-4">
                  <h5 className="mb-0 fw-bold">Cart Items</h5>
                </div>
                <div className="card-body p-0">
                  {cart.items.map((item) => (
                    <div className="px-4 py-3 border-bottom" key={item._id}>
                      <CartItem 
                        item={item} 
                        onUpdate={updateQuantity}
                        onRemove={removeFromCart}
                        onSaveForLater={moveToSavedForLater}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {hasSavedForLater && (
                <div className="card border-0 shadow-sm radius-12 overflow-hidden mt-5">
                  <div className="card-header bg-white border-bottom py-4 px-4">
                    <h5 className="mb-0 fw-bold">Saved for Later ({cart.savedForLater.length})</h5>
                  </div>
                  <div className="card-body p-0">
                    {cart.savedForLater.map((item) => (
                      <div className="px-4 py-3 border-bottom" key={item._id}>
                        <CartItem 
                          item={item} 
                          onUpdate={updateQuantity}
                          onRemove={removeFromCart}
                          onMoveToCart={moveToCart}
                          isSavedForLater={true}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Order Summary Column */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-soft radius-12 sticky-top" style={{ top: '100px' }}>
                <div className="card-header bg-white border-bottom py-4 px-4">
                  <h5 className="mb-0 fw-bold">Order Summary</h5>
                </div>
                <div className="card-body p-4">
                  
                  <div className="mb-4 pb-4 border-bottom">
                    <form onSubmit={handleApplyCoupon}>
                      <label className="form-label text-muted-custom small fw-semibold">Discount Code</label>
                      <div className="input-group">
                        <input 
                          type="text" 
                          className="form-control bg-light border-0 shadow-none px-3" 
                          placeholder="Enter coupon" 
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button className="btn btn-dark fw-bold px-4" type="submit">Apply</button>
                      </div>
                      {couponError && <div className="text-danger small mt-2 fw-medium"><i className="bi bi-exclamation-circle me-1"></i> {couponError}</div>}
                      {couponSuccess && <div className="text-success small mt-2 fw-medium"><i className="bi bi-check-circle me-1"></i> {couponSuccess}</div>}
                    </form>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-secondary fw-medium">Subtotal</span>
                    <span className="fw-bold text-dark">{formattedSubtotal}</span>
                  </div>
                  
                  {cart?.discountPrice > 0 && (
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-secondary fw-medium">Discount</span>
                      <span className="text-success fw-bold">-{formattedDiscount}</span>
                    </div>
                  )}
                  
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-secondary fw-medium">Estimated Tax</span>
                    <span className="fw-bold text-dark">{formattedTax}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-secondary fw-medium">Shipping</span>
                    <span className="text-success fw-bold">{formattedShipping}</span>
                  </div>
                  
                  {cart?.estimatedDelivery && (
                    <div className="d-flex justify-content-between mt-4 p-3 bg-light radius-md mb-2">
                      <span className="text-secondary small fw-medium"><i className="bi bi-calendar-check me-2 text-primary-custom"></i> Estimated Delivery</span>
                      <span className="fw-bold text-dark small">{new Date(cart.estimatedDelivery).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  )}
                  
                  <hr className="my-4" />
                  
                  <div className="d-flex justify-content-between mb-4 align-items-center">
                    <span className="fs-5 fw-bold text-dark">Total</span>
                    <span className="fs-4 fw-bold text-primary-custom">{formattedTotal}</span>
                  </div>
                  
                  <button 
                    className="btn btn-primary w-100 py-3 radius-md fw-bold shadow-sm d-flex justify-content-center align-items-center transition-base hover-scale"
                    onClick={() => navigate('/checkout')}
                  >
                    Proceed to Checkout <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                  
                  <div className="mt-4 text-center">
                    <div className="d-flex justify-content-center gap-2 text-muted-custom">
                      <i className="bi bi-shield-lock-fill"></i>
                      <span className="small">Secure Checkout Powered by Razorpay</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

