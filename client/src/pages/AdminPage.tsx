import React, { useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useProducts } from '@/contexts/ProductContext';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';

const AdminPage: React.FC = () => {
  // Get products and functions from context
  const { products, setProducts, saveProducts, resetProducts } = useProducts();
  // Get auth functions
  const { logout, user } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState<'all' | 'men' | 'women' | 'unisex'>('all');
  const [isSaved, setIsSaved] = useState(false);

  // Handle product updates
  const handleProductChange = (id: string, field: keyof Product, value: any) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === id ? { ...product, [field]: value } : product
      )
    );
    setIsSaved(false);
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
    return matchesSearch && matchesCategory;
  });

  // Save all product changes
  const handleSave = () => {
    saveProducts(products);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Reset to initial products
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all product changes?')) {
      resetProducts();
      setIsSaved(false);
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Product Management</h1>
          <p className="text-muted-foreground">
            Welcome, <span className="font-medium">{user?.username}</span>. Edit product details, prices, and apply discounts.
          </p>
        </div>
        <div className="flex gap-4">
          <Button 
            onClick={handleSave} 
            variant="default" 
            className="bg-primary hover:bg-primary/90"
          >
            {isSaved ? 'Saved!' : 'Save Changes'}
          </Button>
          <Button 
            onClick={handleReset} 
            variant="destructive"
          >
            Reset All
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="all" onValueChange={(value) => setCurrentCategory(value as any)}>
        <TabsList>
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="men">Men</TabsTrigger>
          <TabsTrigger value="women">Women</TabsTrigger>
          <TabsTrigger value="unisex">Unisex</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <ProductTable 
            products={filteredProducts} 
            onProductChange={handleProductChange} 
          />
        </TabsContent>
        
        <TabsContent value="men" className="mt-6">
          <ProductTable 
            products={filteredProducts} 
            onProductChange={handleProductChange} 
          />
        </TabsContent>
        
        <TabsContent value="women" className="mt-6">
          <ProductTable 
            products={filteredProducts} 
            onProductChange={handleProductChange} 
          />
        </TabsContent>
        
        <TabsContent value="unisex" className="mt-6">
          <ProductTable 
            products={filteredProducts} 
            onProductChange={handleProductChange} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ProductTableProps {
  products: Product[];
  onProductChange: (id: string, field: keyof Product, value: any) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onProductChange }) => {
  // For handling discount functionality
  const [discountedProducts, setDiscountedProducts] = useState<Record<string, boolean>>({});
  const [discountAmounts, setDiscountAmounts] = useState<Record<string, number>>({});
  const [originalPrices, setOriginalPrices] = useState<Record<string, string>>({});

  // Initialize discounted products data
  useEffect(() => {
    const initialDiscountedState: Record<string, boolean> = {};
    const initialDiscountAmounts: Record<string, number> = {};
    const initialOriginalPrices: Record<string, string> = {};
    
    products.forEach(product => {
      // Check if product has originalPrice property (means it has a discount)
      const hasDiscount = (product as any).originalPrice !== undefined;
      initialDiscountedState[product.id] = hasDiscount;
      
      if (hasDiscount) {
        const originalPrice = (product as any).originalPrice || product.price;
        const currentPrice = product.price;
        initialOriginalPrices[product.id] = originalPrice;
        
        // Calculate discount amount (percentage)
        const originalValue = parseInt(originalPrice.replace(/[^0-9]/g, ''));
        const currentValue = parseInt(currentPrice.replace(/[^0-9]/g, ''));
        const discountPercentage = Math.round(((originalValue - currentValue) / originalValue) * 100);
        initialDiscountAmounts[product.id] = discountPercentage || 10; // Default to 10% if calculation fails
      } else {
        initialDiscountAmounts[product.id] = 10; // Default discount percentage
        initialOriginalPrices[product.id] = product.price;
      }
    });
    
    setDiscountedProducts(initialDiscountedState);
    setDiscountAmounts(initialDiscountAmounts);
    setOriginalPrices(initialOriginalPrices);
  }, [products]);

  // Handle discount toggle
  const handleDiscountToggle = (id: string, checked: boolean) => {
    setDiscountedProducts(prev => ({ ...prev, [id]: checked }));
    
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    if (checked) {
      // When enabling discount
      const originalPrice = product.price;
      setOriginalPrices(prev => ({ ...prev, [id]: originalPrice }));
      
      // Calculate new discounted price
      const priceValue = parseInt(originalPrice.replace(/[^0-9]/g, ''));
      const discountValue = discountAmounts[id] || 10;
      const newPrice = priceValue - (priceValue * (discountValue / 100));
      
      // Update product with discount
      onProductChange(id, 'price', `R${Math.round(newPrice)}`);
      onProductChange(id, 'originalPrice', originalPrice);
    } else {
      // When disabling discount, restore original price
      const originalPrice = originalPrices[id] || product.price;
      onProductChange(id, 'price', originalPrice);
      onProductChange(id, 'originalPrice', undefined);
    }
  };

  // Handle discount amount change
  const handleDiscountAmountChange = (id: string, amount: number) => {
    setDiscountAmounts(prev => ({ ...prev, [id]: amount }));
    
    // If product is currently discounted, update the price
    if (discountedProducts[id]) {
      const product = products.find(p => p.id === id);
      if (!product) return;
      
      const originalPrice = originalPrices[id];
      if (!originalPrice) return;
      
      const priceValue = parseInt(originalPrice.replace(/[^0-9]/g, ''));
      const newPrice = priceValue - (priceValue * (amount / 100));
      
      onProductChange(id, 'price', `R${Math.round(newPrice)}`);
      onProductChange(id, 'originalPrice', originalPrice);
    }
  };

  if (products.length === 0) {
    return <p className="text-center py-10">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <Card key={product.id} className="overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
            {discountedProducts[product.id] && (
              <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                -{discountAmounts[product.id]}%
              </div>
            )}
          </div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-medium">
                <Input 
                  value={product.name} 
                  onChange={(e) => onProductChange(product.id, 'name', e.target.value)}
                  className="font-semibold" 
                />
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Label htmlFor={`discount-${product.id}`} className="text-sm">Discount</Label>
                <Switch 
                  id={`discount-${product.id}`} 
                  checked={discountedProducts[product.id]} 
                  onCheckedChange={(checked) => handleDiscountToggle(product.id, checked)}
                />
              </div>
            </div>
            <CardDescription>
              Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`price-${product.id}`}>Price</Label>
                  <Input 
                    id={`price-${product.id}`}
                    value={product.price} 
                    onChange={(e) => onProductChange(product.id, 'price', e.target.value)}
                  />
                </div>
                {discountedProducts[product.id] && (
                  <div>
                    <Label htmlFor={`discount-amount-${product.id}`}>Discount %</Label>
                    <Input 
                      id={`discount-amount-${product.id}`}
                      type="number" 
                      min="1" 
                      max="99"
                      value={discountAmounts[product.id]} 
                      onChange={(e) => handleDiscountAmountChange(product.id, parseInt(e.target.value))}
                    />
                  </div>
                )}
                {discountedProducts[product.id] && (
                  <div>
                    <Label htmlFor={`original-price-${product.id}`}>Original Price</Label>
                    <Input 
                      id={`original-price-${product.id}`}
                      value={(product as any).originalPrice || originalPrices[product.id]} 
                      disabled
                      className="bg-muted"
                    />
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor={`description-${product.id}`}>Description</Label>
                <Input 
                  id={`description-${product.id}`}
                  value={product.description} 
                  onChange={(e) => onProductChange(product.id, 'description', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminPage;
