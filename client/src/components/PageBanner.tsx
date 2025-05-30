import React from 'react';

interface PageBannerProps {
  imageUrl: string;
  title?: string;
  subtitle?: string;
  altText?: string;
  titleColor?: string;
}

const PageBanner: React.FC<PageBannerProps> = ({ 
  imageUrl, 
  title, 
  subtitle,
  altText = 'Page Banner',
  titleColor = 'text-[#FF2D55]' // Default to the red color seen in screenshot
}) => {
  return (
    <div className="relative w-full mb-8">
      {/* Banner Title Section */}
      <div className="py-8 text-center">
        {title && (
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold ${titleColor} tracking-wider uppercase font-playfair mb-2`}>
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-md md:text-lg text-[#D4AF37] font-light tracking-wider">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Banner Image Section */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 border-4 border-[#D4AF37] shadow-xl mx-auto max-w-6xl rounded-lg overflow-hidden">
        <img 
          src={imageUrl} 
          alt={altText} 
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default PageBanner;
