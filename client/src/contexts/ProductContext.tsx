import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product, products as initialProducts } from '@/data/products';

interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  saveProducts: (updatedProducts: Product[]) => void;
  resetProducts: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  
  // Load saved products from localStorage on initial mount
  useEffect(() => {
    const loadProducts = () => {
      const savedProducts = localStorage.getItem('yusuf_dubai_products');
      if (savedProducts) {
        try {
          setProducts(JSON.parse(savedProducts));
        } catch (e) {
          console.error('Error parsing saved products:', e);
          localStorage.removeItem('yusuf_dubai_products');
        }
      }
    };
    
    loadProducts();
    
    // Add event listener to sync data across tabs/windows
    window.addEventListener('storage', (event) => {
      if (event.key === 'yusuf_dubai_products') {
        loadProducts();
      }
    });
    
    return () => {
      window.removeEventListener('storage', () => {});
    };
  }, []);

  // Save products to localStorage
  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('yusuf_dubai_products', JSON.stringify(updatedProducts));
  };

  // Reset products to initial state
  const resetProducts = () => {
    setProducts(initialProducts);
    localStorage.removeItem('yusuf_dubai_products');
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, saveProducts, resetProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
