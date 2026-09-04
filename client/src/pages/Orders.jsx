import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import orderService from '../services/orderService';
import OrderCard from '../components/OrderCard';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageNumber = searchParams.get('page') || 1;

  // Optional success message from checkout
  const message = location.state?.message;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getUserOrders({ page: pageNumber });
        setOrders(data.orders || []);
        setPagination(data.pagination || {});
      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    window.scrollTo(0, 0);
  }, [pageNumber]);

  return (
    <div className="section-padding bg-surface" style={{ minHeight: '80vh' }}>
      <div className="container">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/profile" className="text-decoration-none text-muted-custom"><i className="bi bi-arrow-left me-1"></i> Back to Profile</Link></li>
            <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">My Orders</li>
          </ol>
        </nav>
        
        <div className="d-flex align-items-center mb-5 pb-3 border-bottom">
          <h2 className="fw-bold m-0" style={{ letterSpacing: '-0.5px' }}>Order History</h2>
          <span className="badge bg-primary rounded-pill ms-3 fs-6 px-3">{pagination.total || orders.length} Orders</span>
        </div>

        {message && (
          <div className="alert alert-success border-0 shadow-sm radius-12 d-flex align-items-center mb-4 fade show" role="alert">
            <i className="bi bi-check-circle-fill fs-4 text-success me-3"></i>
            <div>
              <h6 className="fw-bold mb-0">Success!</h6>
              <div className="small">{message}</div>
            </div>
            <button type="button" className="btn-close ms-auto" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}

        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <Loader />
          </div>
        ) : error ? (
          <div className="alert alert-danger border-0 radius-12 shadow-sm">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-5 my-5">
            <div className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle mb-4" style={{ width: '100px', height: '100px' }}>
              <i className="bi bi-box-seam fs-1 text-muted-custom"></i>
            </div>
            <h3 className="fw-bold mb-3">No orders yet</h3>
            <p className="text-muted-custom mb-4 max-w-md mx-auto">You haven't placed any orders with us yet. Start exploring our collection and find something you love!</p>
            <Link to="/products" className="btn btn-primary btn-lg px-5 radius-md fw-bold shadow-sm hover-scale">
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="d-grid gap-4">
                  {orders.map((order) => (
                    <OrderCard key={order._id} order={order} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-5">
              <Pagination 
                pages={pagination.pages} 
                page={pagination.page} 
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
