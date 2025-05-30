import React from 'react';
import { getBannerForCategory } from '@/data/products';
import PageBanner from '@/components/PageBanner';
import ProductList from '@/components/ProductList';
import { useProducts } from '@/contexts/ProductContext';

const MenPage: React.FC = () => {
  const { products } = useProducts();
  const menProducts = products.filter(product => product.category === 'men');
  const bannerImage = getBannerForCategory('men');

  return (
    <div className="container mx-auto px-4 py-8">
      {bannerImage && 
        <PageBanner 
          imageUrl={bannerImage} 
          title="Men's Collection"
          altText="Banner for Men's Perfumes"
        />
      }
      <h2 className="text-3xl font-playfair font-semibold text-center mb-10 mt-8 text-foreground">
        Discover Our Men's Fragrances
      </h2>
      <ProductList products={menProducts} />
    </div>
  );
};

export default MenPage;
