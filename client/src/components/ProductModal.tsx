import { X, Star, Clock, Shield, Globe, Flag } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Perfume } from "@shared/schema";

interface ProductModalProps {
  perfume: Perfume | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ perfume, isOpen, onClose }: ProductModalProps) {
  if (!perfume) return null;

  const discountPercent = Math.round(
    ((parseFloat(perfume.originalPrice) - parseFloat(perfume.price)) / parseFloat(perfume.originalPrice)) * 100
  );

  const generateWhatsAppLink = () => {
    const message = encodeURIComponent(`Hi, I'm interested in ${perfume.name} - R${perfume.price}`);
    return `https://wa.me/27713003566?text=${message}`;
  };

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 ${
            i <= numRating ? "fill-primary text-primary" : "text-muted-foreground"
          }`}
        />
      );
    }
    return stars;
  };

  const features = [
    { icon: Clock, text: "Long Lasting" },
    { icon: Shield, text: "IFRA Certified" },
    { icon: Globe, text: "Imported Oils" },
    { icon: Flag, text: "Made in Dubai" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card gold-border">
        <DialogHeader className="flex flex-row items-start justify-between">
          <h2 className="text-2xl font-playfair font-bold text-primary">Product Details</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-6 w-6" />
          </Button>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div>
            <img
              src={perfume.imageUrl}
              alt={perfume.name}
              className="w-full rounded-lg"
            />
          </div>
          
          <div>
            <p className="text-primary text-sm font-medium mb-2 uppercase tracking-wide">
              {perfume.category}
            </p>
            
            <h3 className="text-2xl font-playfair font-semibold text-foreground mb-4">
              {perfume.name}
            </h3>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(perfume.rating)}
              </div>
              <span className="ml-2 text-foreground">({perfume.rating})</span>
              <span className="ml-2 text-muted-foreground">(124 reviews)</span>
            </div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-primary">R{perfume.price}</span>
              <span className="ml-2 text-muted-foreground line-through text-lg">
                R{perfume.originalPrice}
              </span>
              <span className="ml-2 text-red-500 font-semibold">{discountPercent}% OFF</span>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-playfair font-semibold text-foreground mb-3">
                Product Features
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-muted-foreground">
                {perfume.description || "Experience the luxury of authentic Dubai fragrance with this premium perfume. Crafted with the finest ingredients and traditional techniques to deliver an unforgettable scent experience."}
              </p>
            </div>
            
            <Button
              onClick={() => window.open(generateWhatsAppLink(), '_blank')}
              className="w-full luxury-gradient text-black py-4 text-lg font-semibold hover:opacity-90 transition-opacity whatsapp-pulse"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.106"/>
              </svg>
              Buy Now via WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
