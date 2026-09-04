import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ProfileForm from '../components/ProfileForm';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  const joinedDate = new Date(user.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="section-padding bg-surface" style={{ minHeight: '80vh' }}>
      <div className="container">
        
        {/* Page Header */}
        <div className="d-flex align-items-center mb-5 pb-3 border-bottom">
          <h2 className="fw-bold m-0" style={{ letterSpacing: '-0.5px' }}>My Account</h2>
          <span className="badge bg-primary rounded-pill ms-3 fs-6 px-3 text-uppercase">{user.role}</span>
        </div>

        <div className="row g-5">
          {/* Profile Sidebar */}
          <div className="col-lg-4">
            
            {/* Profile Card */}
            <div className="card shadow-soft border-0 radius-12 text-center mb-4 overflow-hidden">
              <div className="bg-primary" style={{ height: '80px', backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)' }}></div>
              <div className="card-body px-4 pb-4 pt-0">
                <div className="position-relative d-inline-block" style={{ marginTop: '-40px' }}>
                  <img 
                    src={user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=E2E8F0&color=2563EB&size=120'} 
                    alt="Profile" 
                    className="rounded-circle border border-4 border-white shadow-sm mb-3 bg-white"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=E2E8F0&color=2563EB&size=120';
                    }}
                  />
                </div>
                <h4 className="fw-bold mb-1 text-dark">{user.name}</h4>
                <p className="text-muted-custom mb-3 small">{user.email}</p>
                
                <hr className="my-4 border-light" />
                
                <div className="text-muted-custom small fw-medium">
                  <i className="bi bi-calendar-check me-2 text-primary-custom"></i> Member since {joinedDate}
                </div>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="card shadow-sm border-0 radius-12">
              <div className="card-header bg-white border-bottom py-4 px-4">
                <h6 className="mb-0 fw-bold"><i className="bi bi-lightning-charge-fill text-warning me-2"></i>Quick Navigation</h6>
              </div>
              <div className="list-group list-group-flush px-2 py-2">
                <Link to="/account/orders" className="list-group-item list-group-item-action d-flex align-items-center py-3 border-0 radius-md mb-1 transition-base hover-scale">
                  <div className="d-flex align-items-center justify-content-center rounded bg-primary bg-opacity-10 text-primary-custom me-3" style={{ width: '40px', height: '40px' }}>
                    <i className="bi bi-box-seam fs-5"></i>
                  </div>
                  <div>
                    <div className="fw-bold text-dark">My Orders</div>
                    <div className="text-muted-custom small">Track & manage your orders</div>
                  </div>
                  <i className="bi bi-chevron-right ms-auto text-muted-custom opacity-50"></i>
                </Link>
                
                <Link to="/cart" className="list-group-item list-group-item-action d-flex align-items-center py-3 border-0 radius-md mb-1 transition-base hover-scale">
                  <div className="d-flex align-items-center justify-content-center rounded bg-info bg-opacity-10 text-info me-3" style={{ width: '40px', height: '40px' }}>
                    <i className="bi bi-cart3 fs-5"></i>
                  </div>
                  <div>
                    <div className="fw-bold text-dark">Shopping Cart</div>
                    <div className="text-muted-custom small">View items in your cart</div>
                  </div>
                  <i className="bi bi-chevron-right ms-auto text-muted-custom opacity-50"></i>
                </Link>
                
                <Link to="/products" className="list-group-item list-group-item-action d-flex align-items-center py-3 border-0 radius-md transition-base hover-scale">
                  <div className="d-flex align-items-center justify-content-center rounded bg-success bg-opacity-10 text-success me-3" style={{ width: '40px', height: '40px' }}>
                    <i className="bi bi-grid-fill fs-5"></i>
                  </div>
                  <div>
                    <div className="fw-bold text-dark">Browse Products</div>
                    <div className="text-muted-custom small">Explore our catalog</div>
                  </div>
                  <i className="bi bi-chevron-right ms-auto text-muted-custom opacity-50"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Profile Edit Form */}
          <div className="col-lg-8">
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
