import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

const Products = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('search') || '';
  const pageNumber = searchParams.get('page') || 1;
  const initialCategory = searchParams.get('category') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters state
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState('-createdAt');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = {
          page: pageNumber,
          sort: sort
        };
        
        if (keyword) params.search = keyword;
        if (category) {
          // Check if category is an ID or Name
          const catObj = categories.find(c => c.name === category || c._id === category);
          params.category = catObj ? catObj._id : category;
        }

        const data = await productService.getProducts(params);
        setProducts(data.products || []);
        setPagination(data.pagination || {});
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (categories.length > 0 || !initialCategory) {
      fetchProducts();
      window.scrollTo(0, 0);
    }
  }, [keyword, pageNumber, category, sort, categories]);

  return (
    <div className="section-padding bg-surface" style={{ minHeight: '80vh' }}>
      <div className="container">
        
        {/* Page Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 pb-3 border-bottom">
          <div>
            <h2 className="fw-bold m-0" style={{ letterSpacing: '-0.5px' }}>
              {keyword ? `Search: "${keyword}"` : 'Shop Collection'}
            </h2>
            <p className="text-muted-custom mt-2 mb-0">Showing {products.length} products {pagination.total ? `of ${pagination.total}` : ''}</p>
          </div>
          
          <div className="mt-4 mt-md-0 d-flex align-items-center">
            <span className="text-muted-custom me-2 small fw-medium text-nowrap">Sort By:</span>
            <select 
              className="form-select form-select-sm border-0 bg-light radius-md fw-medium shadow-none py-2 px-3"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{ minWidth: '180px', cursor: 'pointer' }}
            >
              <option value="-createdAt">Newest Arrivals</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="-ratings">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="row g-5">
          {/* Sidebar Filters */}
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm radius-12 p-4 sticky-top" style={{ top: '100px', backgroundColor: 'var(--color-bg-body)' }}>
              <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h6 className="fw-bold m-0"><i className="bi bi-funnel me-2 text-primary-custom"></i> Filters</h6>
                {(category || keyword) && (
                  <button 
                    className="btn btn-link btn-sm text-decoration-none text-muted-custom p-0"
                    onClick={() => { setCategory(''); setSort('-createdAt'); }}
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="mb-4">
                <h6 className="fw-semibold mb-3 small text-uppercase" style={{ letterSpacing: '0.5px', color: 'var(--color-text-secondary)' }}>Categories</h6>
                <div className="d-flex flex-column gap-2">
                  <div className="form-check custom-radio">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="categoryFilter" 
                      id="cat-all" 
                      checked={category === ''}
                      onChange={() => setCategory('')} 
                    />
                    <label className="form-check-label text-secondary ms-2 cursor-pointer w-100" htmlFor="cat-all">
                      All Products
                    </label>
                  </div>
                  {categories.map(c => (
                    <div className="form-check custom-radio" key={c._id}>
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoryFilter" 
                        id={`cat-${c._id}`}
                        checked={category === c._id || category === c.name}
                        onChange={() => setCategory(c._id)} 
                      />
                      <label className="form-check-label text-secondary ms-2 cursor-pointer w-100" htmlFor={`cat-${c._id}`}>
                        {c.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-white radius-12 shadow-sm text-center mt-4">
                <i className="bi bi-truck fs-3 text-primary-custom mb-2"></i>
                <h6 className="fw-bold fs-6">Free Delivery</h6>
                <p className="small text-muted-custom mb-0">On orders over ₹500</p>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-lg-9">
            {loading ? (
              <div className="d-flex justify-content-center py-5">
                <Loader />
              </div>
            ) : error ? (
              <div className="alert alert-danger radius-12 shadow-sm border-0">{error.toString()}</div>
            ) : products.length === 0 ? (
              <div className="text-center py-5 my-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle mb-4" style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-search fs-2 text-muted-custom"></i>
                </div>
                <h4 className="fw-bold">No products found</h4>
                <p className="text-muted-custom">We couldn't find anything matching your criteria. Try adjusting your filters.</p>
                <button className="btn btn-outline-primary radius-lg mt-2 fw-bold" onClick={() => setCategory('')}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 mb-5">
                  {products.map((product) => (
                    <div className="col" key={product._id}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
                
                <Pagination 
                  pages={pagination.pages} 
                  page={pagination.page} 
                  keyword={keyword} 
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
