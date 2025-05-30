import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import type { Perfume } from "@shared/schema";

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: perfumes = [], isLoading } = useQuery<Perfume[]>({
    queryKey: [`/api/perfumes?filter=${selectedFilter}&sortBy=${sortBy}`],
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleProductClick = (perfume: Perfume) => {
    setSelectedPerfume(perfume);
    setIsModalOpen(true);
  };

  const filterOptions = [
    { value: "all", label: "All Perfumes" },
    { value: "bestsellers", label: "Best Sellers" },
    { value: "new", label: "New Arrivals" },
    { value: "deals", label: "Crazy Deals" },
  ];

  const categories = [
    {
      title: "Best Sellers",
      subtitle: "Top rated fragrances",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      filter: "bestsellers"
    },
    {
      title: "All Perfumes",
      subtitle: "Complete collection",
      image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      filter: "all"
    },
    {
      title: "New Arrivals",
      subtitle: "Latest fragrances",
      image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      filter: "new"
    },
    {
      title: "Crazy Deals",
      subtitle: "Special offers",
      image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      filter: "deals"
    },
  ];

  const bestSellers = perfumes.filter(p => p.filter === "bestsellers").slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 dark-gradient"></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-30" 
             style={{backgroundImage: "url('https://pixabay.com/get/gb20802d345944e862e8347ce2bdaa5abbbeec09f0e2b6582ba5dbc7be4f98bd47ba2a364655c3ae8a60977e1f283221ee55adf30a3572288c9b67b5cba0a7099_1280.jpg')"}}></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-primary mb-6 leading-tight">
            Premium Dubai
            <span className="block text-foreground">Fragrances</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover the essence of luxury with our exclusive collection of authentic Dubai perfumes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => scrollToSection('#all-perfumes')}
              className="luxury-gradient text-black px-8 py-4 text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Explore Collection
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('https://wa.me/27713003566?text=Hi, I\'m interested in your premium perfume collection', '_blank')}
              className="border-2 border-primary text-primary px-8 py-4 text-lg font-semibold hover:bg-primary hover:text-black transition-all whatsapp-pulse"
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold text-center text-primary mb-16">
            Discover Our Collections
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => setSelectedFilter(category.filter)}>
                <div className="relative overflow-hidden rounded-xl gold-border">
                  <img
                    src={category.image}
                    alt={`${category.title} Collection`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-playfair font-semibold text-foreground">{category.title}</h3>
                    <p className="text-muted-foreground">{category.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section id="bestsellers" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-primary mb-4 md:mb-0">
              Best Sellers
            </h2>
            <span className="text-muted-foreground">{bestSellers.length} products</span>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl p-6 animate-pulse">
                  <div className="bg-muted h-64 rounded-lg mb-4"></div>
                  <div className="bg-muted h-4 rounded mb-2"></div>
                  <div className="bg-muted h-6 rounded mb-4"></div>
                  <div className="bg-muted h-10 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {bestSellers.map((perfume) => (
                <ProductCard
                  key={perfume.id}
                  perfume={perfume}
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All Perfumes Section */}
      <section id="all-perfumes" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
              Complete Collection
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our entire range of premium Dubai perfumes, from classic ouds to modern fragrances
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  onClick={() => setSelectedFilter(option.value)}
                  variant={selectedFilter === option.value ? "default" : "outline"}
                  className={selectedFilter === option.value 
                    ? "luxury-gradient text-black" 
                    : "border-primary text-primary hover:bg-primary hover:text-black"
                  }
                >
                  {option.label}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-secondary border-primary/30">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Featured</SelectItem>
                  <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="highToLow">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-muted-foreground">{perfumes.length} products</span>
            </div>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-background rounded-xl p-6 animate-pulse">
                  <div className="bg-muted h-64 rounded-lg mb-4"></div>
                  <div className="bg-muted h-4 rounded mb-2"></div>
                  <div className="bg-muted h-6 rounded mb-4"></div>
                  <div className="bg-muted h-10 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {perfumes.map((perfume) => (
                <ProductCard
                  key={perfume.id}
                  perfume={perfume}
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-8">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Have questions about our perfumes? Contact us directly via WhatsApp for instant assistance
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.106"/>
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-foreground mb-2">WhatsApp Chat</h3>
              <p className="text-muted-foreground mb-4">Chat with us instantly</p>
              <Button 
                onClick={() => window.open('https://wa.me/27713003566', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Start Chat
              </Button>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-foreground mb-2">Phone</h3>
              <p className="text-muted-foreground mb-4">Call us directly</p>
              <a href="tel:+27713003566" className="text-primary hover:text-foreground transition-colors font-semibold">
                +27 71 300 3566
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground mb-4">Send us an email</p>
              <a href="mailto:tebatsomarokane48@gmail.com" className="text-primary hover:text-foreground transition-colors font-semibold">
                tebatsomarokane48@gmail.com
              </a>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-8 gold-border max-w-2xl mx-auto">
            <h3 className="text-2xl font-playfair font-bold text-primary mb-4">Order Tracking</h3>
            <p className="text-muted-foreground mb-6">
              Track your order status by sending us your order number via WhatsApp
            </p>
            <Button
              onClick={() => window.open('https://wa.me/27713003566?text=Hi, I would like to track my order. Order number:', '_blank')}
              className="luxury-gradient text-black px-8 py-4 font-semibold hover:opacity-90 transition-opacity"
            >
              Track Order via WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-primary/20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-playfair font-bold text-primary mb-4">Best Sellers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Ultimate Perfume Box</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Perfume Gift Set For Men</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Perfume Gift Set For Women</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Perfume For Men</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Perfume For Women</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Unisex Perfume</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-playfair font-bold text-primary mb-4">Information</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Refund and Return</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Shipping Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-playfair font-bold text-primary mb-4">Contact Us</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>Email: tebatsomarokane48@gmail.com</p>
                <p>Phone: +27 71 300 3566</p>
                <p>Business Hours: 9:00 AM - 8:00 PM</p>
                <div className="pt-4">
                  <Button
                    onClick={() => window.open('https://wa.me/27713003566', '_blank')}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    WhatsApp Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary/20 pt-8 text-center">
            <p className="text-muted-foreground">
              &copy; 2024 YusufDubaiPerfumes. All rights reserved.
            </p>
            <p className="text-primary font-semibold mt-2">
              Code Written By Tebatso Marokane
            </p>
          </div>
        </div>
      </footer>

      <ProductModal
        perfume={selectedPerfume}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
