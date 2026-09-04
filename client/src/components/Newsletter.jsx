import React from 'react';

const Newsletter = () => {
  return (
    <section className="py-5" style={{ background: 'var(--color-bg-body)' }}>
      <div className="container">
        <div className="card border-0 shadow-lg radius-12 overflow-hidden position-relative" style={{ backgroundColor: 'var(--color-primary)' }}>
          {/* Background Pattern */}
          <div className="position-absolute top-0 start-0 w-100 h-100 opacity-25" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.4) 0%, transparent 50%)',
            pointerEvents: 'none'
          }}></div>

          <div className="card-body p-4 p-md-5 text-center position-relative z-1">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-white">
                <div className="d-inline-flex align-items-center justify-content-center bg-white bg-opacity-25 rounded-circle mb-4" style={{ width: '64px', height: '64px' }}>
                  <i className="bi bi-envelope-paper-fill fs-2"></i>
                </div>
                <h2 className="fw-bold mb-3">Join Our Newsletter</h2>
                <p className="fs-5 opacity-75 mb-4">
                  Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                </p>
                <form className="d-flex mx-auto" style={{ maxWidth: '500px' }} onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    className="form-control form-control-lg border-0 shadow-none rounded-start-pill ps-4"
                    placeholder="Enter your email address"
                    aria-label="Email Address"
                    required
                  />
                  <button className="btn btn-dark btn-lg px-4 fw-bold rounded-end-pill text-white border-dark" type="submit" style={{ backgroundColor: '#0F172A' }}>
                    Subscribe
                  </button>
                </form>
                <div className="mt-3 small opacity-75">
                  <i className="bi bi-shield-check me-1"></i> We respect your privacy. No spam ever.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
