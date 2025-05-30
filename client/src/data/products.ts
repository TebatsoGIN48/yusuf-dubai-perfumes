export interface Product {
  id: string;
  name: string;
  category: 'men' | 'women' | 'unisex';
  price: string; // Keep as string for currency formatting, e.g., "R200"
  originalPrice?: string; // Optional: original price before discount
  image: string; // Path to the image
  bannerImage?: string; // Optional: specific image for banners
  description: string;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const parsePriceFromName = (name: string): string => {
  const match = name.match(/R(\d+)/i);
  return match ? `R${match[1]}` : 'R199'; // Default price if not found
};

export const products: Product[] = [
  // Men's Products
  {
    id: generateId(),
    name: 'Invicto Legend',
    category: 'men',
    price: parsePriceFromName('INVICTO LEGEND R200'),
    image: '/images/men/INVICTO LEGEND R200.png',
    description: 'A legendary fragrance for the modern man, exuding confidence and power.',
  },
  {
    id: generateId(),
    name: 'Tool Box',
    category: 'men',
    price: parsePriceFromName('TOOL BOX R300'),
    image: '/images/men/TOOL BOX R300.png',
    description: 'A versatile and dynamic scent, perfect for any occasion.',
  },
  {
    id: generateId(),
    name: 'Rave Now',
    category: 'men',
    price: parsePriceFromName('RAVE NOW R250'),
    image: '/images/men/RAVE NOW R250.png',
    description: 'An electrifying and vibrant aroma that captures the spirit of the night.',
  },
  {
    id: generateId(),
    name: 'Intense Oud',
    category: 'men',
    price: parsePriceFromName('intense oud R230'),
    image: '/images/men/intense oud R230.png',
    description: 'A rich and captivating oud fragrance, deep and mysterious.',
  },
  {
    id: generateId(),
    name: 'Lattafa Asad',
    category: 'men',
    price: parsePriceFromName('lattafa Asad R330'),
    image: '/images/men/lattafa Asad R330.png',
    description: 'A bold and charismatic scent from Lattafa, truly unforgettable.',
  },
  // Placeholder for men product in 'R380' folder if it's a product
  {
    id: generateId(),
    name: 'Signature Man',
    category: 'men',
    price: 'R380',
    image: '/images/men/R380.png',
    description: 'A sophisticated and timeless fragrance for men.',
  },

  // Women's Products
  {
    id: generateId(),
    name: 'Perla Pour Femme',
    category: 'women',
    price: parsePriceFromName('Perla pour femme R200'),
    image: '/images/women/Perla pour femme R200.png',
    description: 'An elegant and feminine fragrance, like a precious pearl.',
  },
  {
    id: generateId(),
    name: 'Ur Way Intense',
    category: 'women',
    price: parsePriceFromName('UR WAY INTENSE R200'),
    image: '/images/women/UR WAY INTENSE R200.png',
    description: 'A captivating and intense scent that defines your unique path.',
  },
  {
    id: generateId(),
    name: 'Sweet Fantasy',
    category: 'women',
    price: 'R280',
    image: '/images/women/W1.png',
    description: 'A delightful and enchanting fragrance for women.',
  },
  {
    id: generateId(),
    name: 'Lady Elegance',
    category: 'women',
    price: 'R265',
    image: '/images/women/W2.png',
    description: 'A classic and alluring scent for the discerning woman.',
  },
  {
    id: generateId(),
    name: 'Midnight Bloom',
    category: 'women',
    price: 'R290',
    image: '/images/women/W3.png',
    description: 'A modern and chic fragrance with a lasting impression.',
  },
  {
    id: generateId(),
    name: 'Rose Delight',
    category: 'women',
    price: 'R275',
    image: '/images/women/W4.png',
    description: 'A vibrant and joyful scent, perfect for everyday elegance.',
  },

  // Unisex Products
  {
    id: generateId(),
    name: 'Oud Mood',
    category: 'unisex',
    price: parsePriceFromName('OUD MOOD R250'),
    image: '/images/unisex/OUD MOOD R250.png',
    description: 'A captivating oud fragrance that transcends gender, rich and inviting.',
  },
  {
    id: generateId(),
    name: 'Velvet Amber',
    category: 'unisex',
    price: 'R310',
    image: '/images/unisex/U1.png',
    description: 'A versatile and intriguing scent for everyone.',
  },
  {
    id: generateId(),
    name: 'Ocean Breeze',
    category: 'unisex',
    price: 'R300',
    image: '/images/unisex/U2.png',
    description: 'A unique and contemporary fragrance with broad appeal.',
  },
  {
    id: generateId(),
    name: 'Cedar Wood',
    category: 'unisex',
    price: 'R320',
    image: '/images/unisex/U3.png',
    description: 'A harmonious blend of notes, suitable for all.',
  },
  {
    id: generateId(),
    name: 'Mystic Dreams',
    category: 'unisex',
    price: 'R315',
    image: '/images/unisex/U4.png',
    description: 'A modern classic, designed for universal allure.',
  },
];

export const getProductsByCategory = (category: 'men' | 'women' | 'unisex'): Product[] => {
  return products.filter(product => product.category === category);
};

// Assign banner images (using the first product image of each category as a fallback)
products.forEach(p => {
  if (!p.bannerImage) {
    const categoryProducts = getProductsByCategory(p.category);
    if (categoryProducts.length > 0) {
      // Find the product itself in its category list to use its own image as its banner if it's the first
      // or use the first product's image of that category as a general banner for all products in that category
      const firstProductOfCategory = categoryProducts[0];
      p.bannerImage = firstProductOfCategory.image; 
    }
  }
});

// Specific banner for each page (can be overridden)
export const getBannerForCategory = (category: 'men' | 'women' | 'unisex'): string | undefined => {
  const categoryProducts = getProductsByCategory(category);
  if (categoryProducts.length > 0 && categoryProducts[0].bannerImage) {
    return categoryProducts[0].bannerImage;
  }
  // Fallback if no products or banner images are set for the category
  if (category === 'men') return '/images/men/INVICTO LEGEND R200.png'; // Example fallback
  if (category === 'women') return '/images/women/W1.png'; // Example fallback
  if (category === 'unisex') return '/images/unisex/OUD MOOD R250.png'; // Example fallback
  return undefined;
};
