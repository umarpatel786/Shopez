import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts({ limit: 8, sort: '-createdAt' });
        setProducts(data.products || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--color-bg-body)' }}>
      {/* Hero Section */}
      <section className="position-relative overflow-hidden bg-primary pt-5 pb-5">
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-25" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>
        <div className="container py-5 mt-4 position-relative z-1 text-center text-md-start">
          <div className="row align-items-center">
            <div className="col-lg-6 text-white mb-5 mb-lg-0">
              <span className="badge bg-white text-primary rounded-pill px-3 py-2 fw-bold mb-4 shadow-sm" style={{ letterSpacing: '1px', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <i className="bi bi-stars me-1"></i> New Collection 2026
              </span>
              <h1 className="display-4 fw-bold mb-4" style={{ lineHeight: '1.1', letterSpacing: '-1px' }}>
                Discover Premium Quality Products
              </h1>
              <p className="fs-5 opacity-75 mb-5 pe-lg-5">
                Elevate your lifestyle with our curated selection of top-tier electronics, fashion, and home essentials. Delivered fast and secure.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-md-start">
                <Link to="/products" className="btn btn-light btn-lg px-5 fw-bold text-primary radius-lg shadow-sm">
                  Shop Now
                </Link>
                <Link to="/products?sort=-rating" className="btn btn-outline-light btn-lg px-5 fw-bold radius-lg">
                  Trending
                </Link>
              </div>
              <div className="d-flex align-items-center mt-5 gap-4 justify-content-center justify-content-md-start">
                <div className="d-flex align-items-center">
                  <i className="bi bi-truck fs-4 me-2 opacity-75"></i>
                  <span className="small opacity-75">Free Shipping</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-shield-check fs-4 me-2 opacity-75"></i>
                  <span className="small opacity-75">Secure Checkout</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              {/* Abstract Hero Graphic */}
              <div className="position-relative h-100 w-100 d-flex justify-content-center align-items-center">
                <div className="bg-white rounded-circle position-absolute opacity-10 shadow-lg" style={{ width: '400px', height: '400px' }}></div>
                <div className="bg-white bg-opacity-10 radius-12 p-4 shadow-lg glass-panel text-white" style={{ maxWidth: '400px', transform: 'rotate(2deg)' }}>
                   <img src="https://placehold.co/400x300/FFFFFF/2563EB?text=Premium+Collection" alt="Hero" className="img-fluid radius-12 shadow-sm" />
                   <div className="d-flex justify-content-between align-items-center mt-3">
                     <div>
                       <h6 className="mb-0 fw-bold">Smart Watch Ultra</h6>
                       <small className="opacity-75">Latest Edition</small>
                     </div>
                     <span className="fs-5 fw-bold">₹12,999</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section-padding bg-surface">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge-accent mb-2 d-inline-block">Explore</span>
            <h2 className="fw-bold mb-0">Shop by Category</h2>
          </div>
          <div className="row g-4">
            {[
              { title: 'Electronics', icon: 'bi-laptop', color: '#2563EB' },
              { title: 'Fashion', icon: 'bi-handbag', color: '#F97316' },
              { title: 'Home & Living', icon: 'bi-house-heart', color: '#22C55E' },
              { title: 'Accessories', icon: 'bi-watch', color: '#8B5CF6' }
            ].map((cat, idx) => (
              <div className="col-lg-3 col-md-6" key={idx}>
                <Link to={`/products?category=${cat.title}`} className="text-decoration-none">
                  <div className="card border-0 shadow-sm radius-12 h-100 p-4 text-center transition-base hover-scale">
                    <div className="d-inline-flex align-items-center justify-content-center rounded-circle mx-auto mb-3" style={{ width: '64px', height: '64px', backgroundColor: `${cat.color}15`, color: cat.color }}>
                      <i className={`bi ${cat.icon} fs-2`}></i>
                    </div>
                    <h5 className="fw-bold text-dark">{cat.title}</h5>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-body)' }}>
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
            <div>
              <span className="badge-accent mb-2 d-inline-block">Trending</span>
              <h2 className="fw-bold m-0" style={{ letterSpacing: '-0.5px' }}>Latest Arrivals</h2>
            </div>
            <Link to="/products" className="btn btn-outline-primary radius-lg fw-bold px-4">
              View All Products <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>

          {loading ? (
            <Loader />
          ) : error ? (
            <div className="alert alert-danger radius-12 shadow-sm border-0">{error.toString()}</div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {products.map((product) => (
                <div className="col" key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;
