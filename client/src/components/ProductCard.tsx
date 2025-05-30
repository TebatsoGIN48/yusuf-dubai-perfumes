import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products"; // Use our Product interface

// Calculate discount percentage between original and current price
const calculateDiscount = (originalPrice: string, currentPrice: string): number => {
  // Extract numeric values from price strings (removing 'R' and any other non-numeric chars)
  const original = parseInt(originalPrice.replace(/[^0-9]/g, ''));
  const current = parseInt(currentPrice.replace(/[^0-9]/g, ''));
  
  if (original <= 0 || current <= 0 || original <= current) return 0;
  
  // Calculate discount percentage
  const discountPercent = Math.round(((original - current) / original) * 100);
  return discountPercent;
};

interface ProductCardProps {
  product: Product; // Changed from perfume: Perfume
  onProductClick?: (product: Product) => void; // Made optional, can be used for a modal later
}

export default function ProductCard({ product, onProductClick }: ProductCardProps) {
  const generateWhatsAppLink = () => {
    // Ensure product.price is used correctly (it's already a string like "R200")
    const message = encodeURIComponent(`Hi, I'm interested in ${product.name} - ${product.price}`);
    return `https://wa.me/27713003566?text=${message}`; // Hardcoded number as per user's request
  };

  return (
    <Card 
      className="product-hover bg-card gold-border overflow-hidden group cursor-pointer flex flex-col h-full"
      onClick={() => onProductClick && onProductClick(product)}
    >
      <div className="relative w-full aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.originalPrice && (
          <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-lg text-sm font-semibold">
            {calculateDiscount(product.originalPrice, product.price)}% OFF
          </div>
        )}
      </div>
      
      <CardContent className="p-4 flex flex-col flex-grow">
        <p className="text-primary text-xs font-medium mb-1 uppercase tracking-wide">
          {product.category}
        </p>
        
        <h3 className="text-foreground font-playfair font-semibold mb-2 line-clamp-2 text-lg flex-grow">
          {product.name}
        </h3>
        
        {/* Rating removed for now 
        <div className="flex items-center mb-3">
          <div className="flex mr-2">
            {renderStars(product.rating)}
          </div>
          <span className="text-foreground text-sm">({product.rating})</span>
        </div>
        */}
        
        <div className="flex items-center justify-between mb-3 mt-auto">
          <div>
            <span className="text-primary font-bold text-xl">{product.price}</span>
            {product.originalPrice && (
              <span className="text-muted-foreground line-through text-sm ml-2">
                {product.originalPrice}
              </span>
            )}
          </div>
        </div>
        
        <Button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click if button is clicked
            window.open(generateWhatsAppLink(), '_blank');
          }}
          className="w-full luxury-gradient text-black font-semibold hover:opacity-90 transition-opacity btn-hover mt-auto"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.106"/>
          </svg>
          Buy Now via WhatsApp
        </Button>
      </CardContent>
    </Card>
  );
}
