import React from 'react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onProductClick?: (product: Product) => void; // Optional: for future modal/detail view
}

const ProductList: React.FC<ProductListProps> = ({ products, onProductClick }) => {
  if (!products || products.length === 0) {
    return <p className="text-center text-muted-foreground">No products found in this category.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onProductClick={onProductClick} 
        />
      ))}
    </div>
  );
};

export default ProductList;
