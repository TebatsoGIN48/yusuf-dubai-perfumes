import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from '@/lib/utils'; 
import { Search, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const getLinkSpecificClass = (label: string) => {
  switch (label.toUpperCase()) {
    case 'MEN':
      return 'nav-text-men';
    case 'WOMEN':
      return 'nav-text-women';
    case 'UNISEX':
      return 'nav-text-unisex';
    default:
      return '';
  }
};

export default function Navigation() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/men", label: "MEN" },
    { href: "/women", label: "WOMEN" },
    { href: "/unisex", label: "UNISEX" },
    // { href: "/new-arrivals", label: "NEW ARRIVALS" },  // Commented out until page is implemented
    // { href: "/crazy-deals", label: "CRAZY DEALS" },    // Commented out until page is implemented
    { href: "/contact", label: "CONTACT" },
  ];

  // The scrollToSection function might be re-purposed or removed if not scrolling within pages.
  // For now, direct page navigation is handled by <Link>.
  const handleMobileLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-charcoal border-b border-primary/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img src="/images/logo/YDP_Transparent.png" alt="Yusuf Dubai Perfumes Logo" className="h-10 w-auto" /> 
              {/* Adjust h-10 (height) as needed */}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'transition-colors duration-300 text-sm font-medium relative group',
                  getLinkSpecificClass(item.label),
                  location.pathname === item.href 
                    ? `${getLinkSpecificClass(item.label) ? getLinkSpecificClass(item.label).replace('nav-text-', 'active nav-text-') : 'text-primary'} active` 
                    : 'text-foreground hover:text-primary',
                  !getLinkSpecificClass(item.label) && location.pathname === item.href ? 'text-primary' : '',
                  !getLinkSpecificClass(item.label) && location.pathname !== item.href ? 'text-foreground hover:text-primary' : ''
                )}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 luxury-gradient transition-all duration-300 group-hover:w-full ${location.pathname === item.href ? 'w-full' : ''}`}></span>
              </Link>
            ))}
          </div>

          {/* Search Box */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search perfumes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-secondary border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary w-64"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4" />
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden text-primary">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-primary/20">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search perfumes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-secondary border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4" />
                </div>
                
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={handleMobileLinkClick} // Close sheet on click
                    className={cn(
                      'block transition-colors text-left py-2',
                      getLinkSpecificClass(item.label),
                      location.pathname === item.href 
                        ? `${getLinkSpecificClass(item.label) ? getLinkSpecificClass(item.label).replace('nav-text-', 'active nav-text-') : 'text-primary'} active` 
                        : 'text-foreground hover:text-primary',
                      !getLinkSpecificClass(item.label) && location.pathname === item.href ? 'text-primary' : '',
                      !getLinkSpecificClass(item.label) && location.pathname !== item.href ? 'text-foreground hover:text-primary' : ''
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <a
                  href="https://wa.me/27713003566?text=Hi, I'm interested in your premium perfume collection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-center transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </SheetContent>
          </Sheet>

          {/* WhatsApp Contact - Desktop */}
          <div className="hidden md:flex items-center">
            <a
              href="https://wa.me/27713003566?text=Hi, I'm interested in your premium perfume collection"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.106"/>
              </svg>
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
