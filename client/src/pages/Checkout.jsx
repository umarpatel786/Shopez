import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import orderService from '../services/orderService';
import CheckoutForm from '../components/CheckoutForm';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirect if cart is empty
  useEffect(() => {
    if (!cart || !cart.items || cart.items.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  if (!cart || !cart.items || cart.items.length === 0) {
    return null; // Will redirect via useEffect
  }

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

  const submitOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await orderService.createOrder(orderData);
      clearCart();
      
      const successMessage = orderData.paymentMethod === 'Razorpay' 
        ? 'Order placed successfully! Please complete your payment below.' 
        : 'Order placed successfully with Cash on Delivery!';
        
      // Navigate to Orders page on success
      navigate('/account/orders', { state: { message: successMessage } });
    } catch (err) {
      setError(err.toString());
      setLoading(false);
    }
  };

  return (
    <div className="section-padding bg-surface" style={{ minHeight: '80vh' }}>
      <div className="container">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/cart" className="text-decoration-none text-muted-custom"><i className="bi bi-arrow-left me-1"></i> Back to Cart</Link></li>
            <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">Checkout</li>
          </ol>
        </nav>
        
        <div className="d-flex align-items-center mb-5 pb-3 border-bottom">
          <h2 className="fw-bold m-0" style={{ letterSpacing: '-0.5px' }}>Secure Checkout</h2>
          <i className="bi bi-shield-lock-fill ms-3 text-success fs-4"></i>
        </div>

        {error && <div className="alert alert-danger radius-12 shadow-sm border-0 mb-4">{error}</div>}

        <div className="row g-5">
          {/* Checkout Form Column */}
          <div className="col-lg-7">
            <CheckoutForm onSubmit={submitOrder} loading={loading} />
          </div>

          {/* Order Summary Column */}
          <div className="col-lg-5">
            <div className="card shadow-soft border-0 radius-12 sticky-top" style={{ top: '100px' }}>
              <div className="card-header bg-white border-bottom py-4 px-4">
                <h5 className="mb-0 fw-bold">Order Summary</h5>
              </div>
              <div className="card-body p-4">
                <ul className="list-unstyled mb-4">
                  {cart.items.map((item) => (
                    <li className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom" key={item._id}>
                      <div className="d-flex align-items-center">
                        <div className="position-relative">
                          <img 
                            src={item.product?.images?.[0]?.url || 'https://via.placeholder.com/60'} 
                            alt={item.product?.name} 
                            className="radius-md object-fit-cover me-3 border border-light"
                            style={{ width: '60px', height: '60px' }}
                          />
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary bg-opacity-75" style={{ fontSize: '0.7rem' }}>
                            {item.quantity}
                          </span>
                        </div>
                        <div>
                          <div className="text-truncate fw-medium text-dark" style={{ maxWidth: '180px', fontSize: '0.9rem' }}>
                            {item.product?.name}
                          </div>
                          <div className="text-muted-custom small">Price: ₹{(item.product?.price || 0).toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                      <span className="fw-semibold text-dark">
                        ₹{((item.product?.price || 0) * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </li>
                  ))}
                </ul>
                
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

                <div className="d-flex justify-content-between mb-4 pb-4 border-bottom">
                  <span className="text-secondary fw-medium">Shipping</span>
                  <span className="text-success fw-bold">{formattedShipping}</span>
                </div>
                
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fs-5 fw-bold text-dark">Total</span>
                  <span className="fs-4 fw-bold text-primary-custom">{formattedTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

