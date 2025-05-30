import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductContext';

const HomePage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/images/men/INVICTO LEGEND R200.png')" }} 
        ></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold font-playfair text-white mb-4 tracking-wider">
            YUSUF DUBAI <span className="text-[#D4AF37]">PERFUMES</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8">
            Experience the art of luxury fragrance crafted from the finest ingredients
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/men">
              <Button className="bg-[#D4AF37] hover:bg-[#B8963A] text-black text-lg px-8 py-6">
                Shop Men's Collection
              </Button>
            </Link>
            <Link to="/women">
              <Button className="bg-[#D4AF37] hover:bg-[#B8963A] text-black text-lg px-8 py-6">
                Shop Women's Collection
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="w-10 h-10 text-[#D4AF37]" />
        </div>
      </section>

      {/* Story Section 1: The Art of Perfumery */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-playfair text-[#D4AF37] mb-6">The Art of Perfumery</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 leading-relaxed">
              At Yusuf Dubai Perfumes, we believe that a fragrance is more than just a scent—it's an expression of identity, 
              a memory captured in a bottle, a story waiting to be told. Our journey began with a passion for the ancient 
              art of perfumery and a vision to create fragrances that transcend the ordinary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/images/women/Perla pour femme R200.png" 
                alt="The Art of Perfumery" 
                className="rounded-lg shadow-xl border-4 border-[#D4AF37] w-full h-[500px] object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-playfair font-semibold text-white mb-4">From Dubai to the World</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our story begins in the heart of Dubai, where ancient perfumery traditions meet modern luxury. 
                Drawing inspiration from the rich heritage of Arabic perfumery, we have crafted a collection that 
                honors traditional techniques while embracing contemporary sensibilities.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Each Yusuf Dubai fragrance is a carefully orchestrated symphony of notes, designed to evolve over time, 
                revealing different facets of its character as it warms on the skin. This dynamic quality ensures that 
                our perfumes are not just worn—they are experienced.
              </p>
              <Link to="/unisex">
                <Button className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                  Discover Our Philosophy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Story Section 2: The Ingredients Journey */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-playfair text-[#D4AF37] mb-6">The Ingredients Journey</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 leading-relaxed">
              Sourcing the world's finest ingredients is at the heart of our perfume creation process. From the roses of Taif 
              to the frankincense of Oman, we travel the globe in search of the most exquisite natural materials.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg border border-[#D4AF37]/30 flex flex-col">
              <div className="h-48 overflow-hidden rounded-lg mb-4">
                <img 
                  src="/images/men/TOOL BOX R300.png" 
                  alt="Rare Woods" 
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Rare Woods</h3>
              <p className="text-gray-400 flex-grow">
                Our collection features the most coveted woods in perfumery, including Cambodian Oud, Indian Sandalwood, 
                and Cedar from the Atlas Mountains. These precious materials form the foundation of many of our most luxurious creations.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-[#D4AF37]/30 flex flex-col">
              <div className="h-48 overflow-hidden rounded-lg mb-4">
                <img 
                  src="/images/unisex/OUD MOOD R250.png" 
                  alt="Precious Resins" 
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Precious Resins</h3>
              <p className="text-gray-400 flex-grow">
                The mystical frankincense from Oman, sweet myrrh from Ethiopia, and the balsamic amber from the Arabian Peninsula 
                add depth and complexity to our compositions, creating an aura of mystery and sophistication.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-[#D4AF37]/30 flex flex-col">
              <div className="h-48 overflow-hidden rounded-lg mb-4">
                <img 
                  src="/images/men/lattafa Asad R330.png" 
                  alt="Exotic Florals" 
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Exotic Florals</h3>
              <p className="text-gray-400 flex-grow">
                From the legendary Taif rose of Saudi Arabia to the jasmine of Egypt and the orange blossom of Morocco, 
                our floral ingredients capture the very essence of luxury and beauty from across the Middle East and beyond.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/men">
              <Button className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                Explore Our Collections
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Story Section 3: Craftsmanship */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-[#D4AF37] mb-6">The Art of Craftsmanship</h2>
              <div className="w-24 h-1 bg-[#D4AF37] mb-8"></div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Each Yusuf Dubai perfume is crafted with meticulous attention to detail. Our master perfumers, with decades of 
                experience in the art, blend traditional techniques with modern innovation to create fragrances of unparalleled quality.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The creation process begins with selecting the finest raw materials, which are then expertly extracted and 
                aged to perfection. Each composition undergoes numerous revisions and refinements until it achieves the 
                perfect balance of notes—a process that can take months or even years to complete.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our dedication to quality extends to every aspect of the product, from the fragrance itself to the 
                meticulously designed bottles and packaging that house these precious elixirs.
              </p>
              <Link to="/unisex">
                <Button className="bg-[#D4AF37] hover:bg-[#B8963A] text-black text-lg">
                  View Unisex Collection
                </Button>
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src="/images/men/intense oud R230.png" 
                alt="Perfume Craftsmanship" 
                className="rounded-lg shadow-xl border-4 border-[#D4AF37] w-full h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Story Section 4: Our Collections */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-playfair text-[#D4AF37] mb-6">Our Collections</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 leading-relaxed">
              Discover our curated collections, each telling a unique story and offering a distinctive olfactory experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-lg cursor-pointer">
              <img 
                src="/images/men/INVICTO LEGEND R200.png" 
                alt="Men's Collection" 
                className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-4">
                <h3 className="text-2xl font-bold text-white mb-2">Men's Collection</h3>
                <p className="text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Bold, sophisticated fragrances for the modern gentleman.
                </p>
                <Link to="/men">
                  <Button className="bg-[#D4AF37] hover:bg-[#B8963A] text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Explore
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-lg cursor-pointer">
              <img 
                src="/images/women/Perla pour femme R200.png" 
                alt="Women's Collection" 
                className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-4">
                <h3 className="text-2xl font-bold text-white mb-2">Women's Collection</h3>
                <p className="text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Elegant, captivating scents that celebrate femininity.
                </p>
                <Link to="/women">
                  <Button className="bg-[#D4AF37] hover:bg-[#B8963A] text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Explore
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-lg cursor-pointer">
              <img 
                src="/images/unisex/OUD MOOD R250.png" 
                alt="Unisex Collection" 
                className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-4">
                <h3 className="text-2xl font-bold text-white mb-2">Unisex Collection</h3>
                <p className="text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Transcendent fragrances that defy conventional boundaries.
                </p>
                <Link to="/unisex">
                  <Button className="bg-[#D4AF37] hover:bg-[#B8963A] text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Explore
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-4 bg-[#D4AF37]/10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-[#D4AF37] mb-6">Experience Luxury</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Discover the perfect fragrance to express your unique style and personality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/men">
              <Button className="bg-[#D4AF37] hover:bg-[#B8963A] text-black text-lg px-8 py-6">
                Shop Men's Collection
              </Button>
            </Link>
            <Link to="/women">
              <Button className="bg-[#D4AF37] hover:bg-[#B8963A] text-black text-lg px-8 py-6">
                Shop Women's Collection
              </Button>
            </Link>
            <Link to="/unisex">
              <Button className="bg-[#D4AF37] hover:bg-[#B8963A] text-black text-lg px-8 py-6">
                Shop Unisex Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
