import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import { ProductData } from '../types';
import { createRandomProduct } from '../dataGenerator';
import { BriefProduct } from './BriefProduct';
import './ProductList.css';

export interface ProductListProps {
  initialProducts?: ProductData[];
  enableInfiniteScroll?: boolean;
  itemsPerLoad?: number;
  onProductClick?: (product: ProductData) => void;
}

export const ProductList: FC<ProductListProps> = ({
  initialProducts = [],
  enableInfiniteScroll = true,
  itemsPerLoad = 6,
  onProductClick,
}) => {
  const [products, setProducts] = useState<ProductData[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  const generateNewProducts = useCallback((count: number): ProductData[] => {
    const newProducts: ProductData[] = [];
    for (let i = 0; i < count; i++) {
      newProducts.push(createRandomProduct());
    }
    return newProducts;
  }, []);

  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newProducts = generateNewProducts(itemsPerLoad);
    setProducts((prevProducts) => [...prevProducts, ...newProducts]);

    // Simulate reaching end of data after 60 products
    if (products.length + newProducts.length >= 60) {
      setHasMore(false);
    }

    setLoading(false);
  }, [loading, hasMore, generateNewProducts, itemsPerLoad, products.length]);

  const handleShowMore = () => {
    loadMoreProducts();
  };

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!enableInfiniteScroll || !observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && hasMore) {
          loadMoreProducts();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [enableInfiniteScroll, loading, hasMore, loadMoreProducts]);

  // Initialize with some products if empty
  useEffect(() => {
    if (products.length === 0) {
      const initialProductsToLoad = generateNewProducts(itemsPerLoad);
      setProducts(initialProductsToLoad);
    }
  }, [products.length, generateNewProducts, itemsPerLoad]);

  const handleProductClick = (product: ProductData) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <div className="picklematch-product-list">
      <div className="picklematch-product-list-header">
        <h2 className="picklematch-product-list-title">Products</h2>
        <span className="picklematch-product-list-count">{products.length} products</span>
      </div>

      <div className="picklematch-product-list-grid">
        {products.map((product) => (
          <div key={product.id} className="picklematch-product-list-item" onClick={() => handleProductClick(product)}>
            <BriefProduct product={product} cartCount={0} />
          </div>
        ))}
      </div>

      {loading && (
        <div className="picklematch-product-list-loading">
          <div className="picklematch-loading-spinner"></div>
          <span>Loading more products...</span>
        </div>
      )}

      {!enableInfiniteScroll && hasMore && !loading && (
        <div className="picklematch-product-list-actions">
          <button className="picklematch-show-more-button" onClick={handleShowMore} disabled={loading}>
            Show More Products
          </button>
        </div>
      )}

      {!hasMore && (
        <div className="picklematch-product-list-end">
          <span>All products loaded</span>
        </div>
      )}

      {/* Intersection observer target */}
      {enableInfiniteScroll && hasMore && <div ref={observerRef} className="picklematch-intersection-target" />}
    </div>
  );
};
