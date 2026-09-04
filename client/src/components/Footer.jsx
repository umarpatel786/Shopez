import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand & About */}
          <div className="col-lg-4 col-md-6 pe-lg-5">
            <Link to="/" className="text-decoration-none d-inline-flex align-items-center mb-3">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                <i className="bi bi-bag-fill fs-6"></i>
              </div>
              <h4 className="fw-bold mb-0 text-white" style={{ letterSpacing: '-0.5px' }}>SHOPEZ</h4>
            </Link>
            <p className="text-secondary small lh-lg mb-4" style={{ color: '#94A3B8' }}>
              Your premium destination for the latest products. High-quality items with lightning-fast delivery, secure payments, and hassle-free returns.
            </p>

            {/* Social Links */}
            <div className="d-flex gap-2">
              {[
                { icon: 'bi-facebook', label: 'Facebook' },
                { icon: 'bi-twitter-x', label: 'Twitter' },
                { icon: 'bi-instagram', label: 'Instagram' },
                { icon: 'bi-youtube', label: 'YouTube' },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="d-flex align-items-center justify-content-center rounded-circle text-white text-decoration-none bg-secondary bg-opacity-25"
                  style={{
                    width: '36px',
                    height: '36px',
                    transition: 'all 0.2s ease',
                  }}
                  title={label}
                  onMouseEnter={(e) => { e.currentTarget.classList.replace('bg-secondary', 'bg-primary'); }}
                  onMouseLeave={(e) => { e.currentTarget.classList.replace('bg-primary', 'bg-secondary'); }}
                >
                  <i className={`bi ${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="text-white fw-bold mb-3 text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Shop</h6>
            <ul className="list-unstyled">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'All Products' },
                { to: '/cart', label: 'Shopping Cart' },
                { to: '/account/orders', label: 'Track Order' },
              ].map(({ to, label }) => (
                <li key={to} className="mb-2">
                  <Link to={to} className="text-decoration-none small" style={{ color: '#94A3B8', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="text-white fw-bold mb-3 text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Support</h6>
            <ul className="list-unstyled">
              {[
                { to: '/account/dashboard', label: 'My Account' },
                { to: '/account/orders', label: 'Order History' },
                { to: '#', label: 'FAQ' },
                { to: '/return-policy', label: 'Returns' },
                { to: '/privacy-policy', label: 'Privacy Policy' },
              ].map(({ to, label }) => (
                <li key={label} className="mb-2">
                  <Link to={to} className="text-decoration-none small" style={{ color: '#94A3B8', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-6">
            <h6 className="text-white fw-bold mb-3 text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Contact Us</h6>
            <ul className="list-unstyled">
              <li className="d-flex align-items-start mb-3">
                <i className="bi bi-geo-alt-fill me-3 mt-1 text-primary-custom"></i>
                <span className="small" style={{ color: '#94A3B8' }}>123 Commerce St, MG Road, Mumbai, Maharashtra 400001, India</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <i className="bi bi-telephone-fill me-3 text-primary-custom"></i>
                <span className="small" style={{ color: '#94A3B8' }}>+91 98765 43210</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <i className="bi bi-envelope-fill me-3 text-primary-custom"></i>
                <span className="small" style={{ color: '#94A3B8' }}>support@shopez.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="row py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="col-12">
            <div className="d-flex flex-wrap justify-content-center gap-4">
              {[
                { icon: 'bi-truck', text: 'Free Shipping over ₹500' },
                { icon: 'bi-shield-lock-fill', text: '100% Secure Payments' },
                { icon: 'bi-arrow-repeat', text: '7 Day Easy Returns' },
                { icon: 'bi-headset', text: '24/7 Customer Support' },
              ].map(({ icon, text }) => (
                <div key={text} className="d-flex align-items-center">
                  <i className={`bi ${icon} me-2 fs-5 text-primary-custom`}></i>
                  <span className="small" style={{ color: '#94A3B8' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods & Copyright */}
        <div className="row pt-4 align-items-center" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="col-md-6 mb-3 mb-md-0 text-center text-md-start">
            <p className="small mb-0" style={{ color: '#94A3B8' }}>
              © {currentYear} <span className="text-white fw-medium">SHOPEZ</span>. All Rights Reserved. Made with <i className="bi bi-heart-fill text-danger"></i> in India
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <div className="d-inline-flex gap-2">
              {['bi-credit-card-fill', 'bi-phone-fill', 'bi-bank'].map((icon, i) => (
                <span key={i} className="d-flex align-items-center justify-content-center rounded bg-secondary bg-opacity-25" style={{ width: '40px', height: '28px', color: '#94A3B8' }}>
                  <i className={`bi ${icon}`}></i>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
