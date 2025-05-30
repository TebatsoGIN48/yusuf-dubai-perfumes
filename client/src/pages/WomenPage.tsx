import React from 'react';
import PageBanner from '@/components/PageBanner';
import ProductList from '@/components/ProductList';
import { getBannerForCategory } from '@/data/products';
import { useProducts } from '@/contexts/ProductContext';

const WomenPage: React.FC = () => {
  const { products } = useProducts();
  const womenProducts = products.filter(product => product.category === 'women');
  const bannerImage = getBannerForCategory('women');

  return (
    <div className="container mx-auto px-4 py-8">
      {bannerImage && 
        <PageBanner 
          imageUrl={bannerImage} 
          title="Women's Collection"
          altText="Banner for Women's Perfumes"
        />
      }
      <h2 className="text-3xl font-playfair font-semibold text-center mb-10 mt-8 text-foreground">
        Explore Our Women's Fragrances
      </h2>
      <ProductList products={womenProducts} />
    </div>
  );
};

export default WomenPage;
