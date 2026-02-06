import React from 'react';

/**
 * Interface representing the structure of a Product object.
 */
export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
}

/**
 * Props interface for the ProductCard component.
 */
interface ProductCardProps {
  product: Product;
  className?: string;
  onActionClick?: (product: Product) => void;
}

/**
 * A reusable ProductCard component for catalog and listing pages.
 */
export const ProductCards: React.FC<ProductCardProps> = ({ 
  product, 
  className = "", 
  onActionClick 
}) => {
  // Safety check: ensure product and price exist before attempting to format
  const priceValue = product?.price ?? 0;

  // Format the price using Intl.NumberFormat for proper currency localization
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(priceValue);

  const handleAction = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (onActionClick && product) {
      e.preventDefault();
      onActionClick(product);
    }
  };

  // If for some reason the product is missing entirely, return null to avoid crashing
  if (!product) return null;

  return (
    <div className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full ${className}`}>
      {/* Image Container */}
      <div className="aspect-square overflow-hidden bg-gray-50 relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          // Fallback logic for broken custom product images
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "https://placehold.co/400x400/D1D5DB/4B5563?text=Image+Unavailable";
          }}
        />
        {/* Overlay effect on hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow text-center">
        <h4 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300 line-clamp-2">
          {product.title}
        </h4>
        
        <p className="text-pink-600 font-extrabold mt-2 text-2xl tracking-tight">
          {formattedPrice}
        </p>

        <div className="mt-auto pt-4">
          <button
            onClick={handleAction}
            className="inline-flex items-center justify-center text-sm font-bold text-gray-900 bg-pink-200 hover:bg-pink-300 w-full py-2.5 rounded-xl transition-all duration-200 active:scale-95"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;