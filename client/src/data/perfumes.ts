// This file contains static data as backup/reference
// The actual data comes from the server storage

export const staticPerfumeData = [
  {
    id: 1,
    name: "OUD ROYAL GOLD",
    category: "PREMIUM OUD COLLECTION",
    price: "840.00",
    originalPrice: "1099.00",
    rating: "5.0",
    imageUrl: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    filter: "bestsellers",
    description: "Experience the luxury of authentic Dubai fragrances with this exclusive OUD collection."
  },
  {
    id: 2,
    name: "DUBAI NIGHTS INTENSE",
    category: "SIGNATURE COLLECTION",
    price: "675.00",
    originalPrice: "899.00",
    rating: "4.8",
    imageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    filter: "new",
    description: "A captivating blend that embodies the mystique of Dubai nights."
  },
  // ... more perfume data as needed
];

export const perfumeCategories = [
  { value: "all", label: "All Perfumes" },
  { value: "bestsellers", label: "Best Sellers" },
  { value: "new", label: "New Arrivals" },
  { value: "deals", label: "Crazy Deals" },
];

export const sortOptions = [
  { value: "default", label: "Featured" },
  { value: "lowToHigh", label: "Price: Low to High" },
  { value: "highToLow", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];
