import React from 'react';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Verified Buyer',
      content: 'The quality of the products and the speed of delivery exceeded my expectations. I will definitely be shopping here again!',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=E2E8F0&color=2563EB'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Tech Enthusiast',
      content: 'SHOPEZ has the best collection of electronics. The customer support team was incredibly helpful when I had questions about my order.',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=E2E8F0&color=2563EB'
    },
    {
      id: 3,
      name: 'Priya Patel',
      role: 'Verified Buyer',
      content: 'I love the UI and how easy it is to find what I need. The premium checkout experience makes me feel secure with my payments.',
      rating: 4,
      image: 'https://ui-avatars.com/api/?name=Priya+Patel&background=E2E8F0&color=2563EB'
    }
  ];

  return (
    <section className="section-padding bg-surface">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge-accent mb-2 d-inline-block">Testimonials</span>
          <h2 className="fw-bold mb-3">What Our Customers Say</h2>
          <p className="text-muted-custom mx-auto" style={{ maxWidth: '600px' }}>
            Don't just take our word for it. Read what verified buyers have to say about their shopping experience with us.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {reviews.map((review) => (
            <div className="col-lg-4 col-md-6" key={review.id}>
              <div className="card h-100 border-0 shadow-sm radius-12 p-4">
                <div className="d-flex align-items-center mb-4">
                  <img src={review.image} alt={review.name} className="rounded-circle me-3" width="56" height="56" />
                  <div>
                    <h6 className="fw-bold mb-1">{review.name}</h6>
                    <span className="text-muted-custom small">{review.role}</span>
                  </div>
                </div>
                <div className="mb-3 text-warning">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`bi bi-star${i < review.rating ? '-fill' : ''} me-1`}></i>
                  ))}
                </div>
                <p className="text-secondary mb-0 fst-italic">"{review.content}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
