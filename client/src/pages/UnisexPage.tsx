import React from 'react';
import PageBanner from '@/components/PageBanner';
import ProductList from '@/components/ProductList';
import { getBannerForCategory } from '@/data/products';
import { useProducts } from '@/contexts/ProductContext';

const UnisexPage: React.FC = () => {
  const { products } = useProducts();
  const unisexProducts = products.filter(product => product.category === 'unisex');
  const bannerImage = getBannerForCategory('unisex');

  return (
    <div className="container mx-auto px-4 py-8">
      {bannerImage && 
        <PageBanner 
          imageUrl={bannerImage} 
          title="Unisex Collection"
          altText="Banner for Unisex Perfumes"
        />
      }
      <h2 className="text-3xl font-playfair font-semibold text-center mb-10 mt-8 text-foreground">
        Discover Our Unisex Fragrances
      </h2>
      <ProductList products={unisexProducts} />
    </div>
  );
};

export default UnisexPage;
