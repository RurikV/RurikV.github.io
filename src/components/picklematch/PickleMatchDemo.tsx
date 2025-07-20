import React, { FC, useState } from 'react';
import { ProductData, TransactionData } from './types';
import { createRandomProduct, createRandomTransaction } from './dataGenerator';
import { Modal } from './modal/Modal';
import { ProductList } from './ecommerce/ProductList';
import { TransactionList } from './transaction/TransactionList';
import { FullProduct } from './ecommerce/FullProduct';
import { FullTransaction } from './transaction/FullTransaction';
import './PickleMatchDemo.css';

export const PickleMatchDemo: FC = () => {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showProductList, setShowProductList] = useState(false);
  const [showTransactionList, setShowTransactionList] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);

  // Generate sample items for modal demonstration
  const sampleProduct = createRandomProduct();
  const sampleTransaction = createRandomTransaction();

  const handleProductClick = (product: ProductData) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleTransactionClick = (transaction: TransactionData) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  };

  const closeTransactionModal = () => {
    setShowTransactionModal(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="picklematch-demo">
      <div className="picklematch-demo-header">
        <h1>PickleMatch App Demo</h1>
        <p>
          Comprehensive demonstration of PickleMatch components: Enhanced modals with portals, infinite scroll lists
          with IntersectionObserver, and dynamic data generation.
        </p>
      </div>

      <div className="picklematch-demo-controls">
        <div className="picklematch-demo-section">
          <h2>Enhanced Modal Components</h2>
          <p>Modals with React portals, body mounting, escape key handling, and accessibility features</p>
          <div className="picklematch-demo-buttons">
            <button className="picklematch-demo-button" onClick={() => setShowProductModal(true)}>
              Show Product in Modal
            </button>
            <button className="picklematch-demo-button" onClick={() => setShowTransactionModal(true)}>
              Show Transaction in Modal
            </button>
          </div>
        </div>

        <div className="picklematch-demo-section">
          <h2>Infinite Scroll Lists</h2>
          <p>Lists with IntersectionObserver for performance-optimized infinite scrolling</p>
          <div className="picklematch-demo-buttons">
            <button className="picklematch-demo-button" onClick={() => setShowProductList(!showProductList)}>
              {showProductList ? 'Hide' : 'Show'} Product List
            </button>
            <button className="picklematch-demo-button" onClick={() => setShowTransactionList(!showTransactionList)}>
              {showTransactionList ? 'Hide' : 'Show'} Transaction List
            </button>
          </div>
        </div>
      </div>

      <div className="picklematch-demo-content">
        {showProductList && (
          <div className="picklematch-demo-list-container">
            <h3>Product List with Infinite Scroll</h3>
            <ProductList enableInfiniteScroll={true} itemsPerLoad={6} onProductClick={handleProductClick} />
          </div>
        )}

        {showTransactionList && (
          <div className="picklematch-demo-list-container">
            <h3>Transaction List with Balance Tracking</h3>
            <TransactionList enableInfiniteScroll={true} itemsPerLoad={8} onTransactionClick={handleTransactionClick} />
          </div>
        )}
      </div>

      {/* Product Modal */}
      <Modal visible={showProductModal} onClose={closeProductModal}>
        <div className="picklematch-demo-modal-content">
          <h3>Product Details</h3>
          <p>This product is displayed in a modal that uses React portals to mount in the document body.</p>
          {selectedProduct ? (
            <FullProduct product={selectedProduct} cartCount={0} />
          ) : (
            <FullProduct product={sampleProduct} cartCount={0} />
          )}
          <div className="picklematch-demo-modal-actions">
            <button className="picklematch-demo-button" onClick={closeProductModal}>
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Transaction Modal */}
      <Modal visible={showTransactionModal} onClose={closeTransactionModal}>
        <div className="picklematch-demo-modal-content">
          <h3>Transaction Details</h3>
          <p>This transaction is displayed in a modal with portal functionality and accessibility features.</p>
          {selectedTransaction ? (
            <FullTransaction transaction={selectedTransaction} />
          ) : (
            <FullTransaction transaction={sampleTransaction} />
          )}
          <div className="picklematch-demo-modal-actions">
            <button className="picklematch-demo-button" onClick={closeTransactionModal}>
              Close
            </button>
          </div>
        </div>
      </Modal>

      <div className="picklematch-demo-features">
        <h2>Key Features Implemented</h2>
        <div className="picklematch-demo-feature-grid">
          <div className="picklematch-demo-feature">
            <h4>🚀 Enhanced Modal Component</h4>
            <ul>
              <li>React portals for body mounting</li>
              <li>Escape key handling</li>
              <li>Body scroll prevention</li>
              <li>Accessibility features (ARIA)</li>
              <li>Proper cleanup on unmount</li>
            </ul>
          </div>
          <div className="picklematch-demo-feature">
            <h4>📋 Infinite Scroll Lists</h4>
            <ul>
              <li>IntersectionObserver for performance</li>
              <li>Dynamic data generation</li>
              <li>Loading states and indicators</li>
              <li>Fallback &quot;Show More&quot; button</li>
              <li>Responsive grid layouts</li>
            </ul>
          </div>
          <div className="picklematch-demo-feature">
            <h4>💰 Transaction Management</h4>
            <ul>
              <li>Real-time balance calculation</li>
              <li>Income/expense tracking</li>
              <li>Transaction summaries</li>
              <li>Click-to-view details</li>
              <li>Responsive design</li>
            </ul>
          </div>
          <div className="picklematch-demo-feature">
            <h4>🛍️ Product Catalog</h4>
            <ul>
              <li>Grid-based product display</li>
              <li>Hover effects and animations</li>
              <li>Product detail modals</li>
              <li>Cart integration ready</li>
              <li>Mobile-friendly layout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
