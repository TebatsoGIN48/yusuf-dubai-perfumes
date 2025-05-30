import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Yusuf Dubai Perfumes</h3>
            <p className="mb-4">Experience the art of luxury fragrance crafted from the finest ingredients.</p>
            <p>© {new Date().getFullYear()} Yusuf Dubai Perfumes. All rights reserved.</p>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link></li>
              <li><Link to="/men" className="hover:text-[#D4AF37] transition-colors">Men's Collection</Link></li>
              <li><Link to="/women" className="hover:text-[#D4AF37] transition-colors">Women's Collection</Link></li>
              <li><Link to="/unisex" className="hover:text-[#D4AF37] transition-colors">Unisex Collection</Link></li>
              <li><Link to="/contact" className="hover:text-[#D4AF37] transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <p className="mb-2">Johannesburg, South Africa</p>
            <p className="mb-2">Phone: +27713003566</p>
            <p className="mb-2">Email: contact@yusufdubaiperfumes.com</p>
            <div className="flex items-center mt-4">
              <a 
                href="https://wa.me/27713003566?text=Hi, I'm interested in your premium perfume collection"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D4AF37] hover:bg-[#B8963A] text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors mr-4"
              >
                WhatsApp Us
              </a>
              
              {/* Admin link - discretely styled */}
              <Link 
                to="/admin" 
                className="text-gray-500 hover:text-gray-300 text-xs underline transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
