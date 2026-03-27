import React from 'react';
import { Link } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../../cart/cartSlice';
import { HiOutlineShoppingBag, HiOutlineHeart, HiStar } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { id, title, price, image, category, rating, discountPrice } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addItem({ id, title, price, image }));
    toast.success(`${title} added to cart!`);
  };

  return (
    <RouterLink 
      to={`/product/${id}`}
      className="group block bg-white rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 shadow-sm relative"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500 will-change-transform"
        />
        {/* Wishlist Icon */}
        <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white/70 backdrop-blur-md text-gray-400 hover:text-red-500 hover:bg-white shadow-sm transition-all">
          <HiOutlineHeart size={20} />
        </button>
        {/* Discount Badge */}
        {discountPrice && (
          <div className="absolute top-4 left-4 py-1 px-3 rounded-md bg-red-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg">
            Sale
          </div>
        )}
        
        {/* Quick Add To Cart Overlay */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
           <Button 
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center py-3 bg-primary-900 border-none hover:bg-primary-950 text-white rounded-xl shadow-2xl"
           >
             <HiOutlineShoppingBag className="mr-2" size={18} />
             Add To Cart
           </Button>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs font-bold text-primary-500 uppercase tracking-widest leading-none">
            {category}
          </p>
          <div className="flex items-center text-yellow-400 text-xs font-bold bg-yellow-50 px-2 py-1 rounded-md">
            <HiStar className="mr-0.5" />
            <span>{rating.rate}</span>
          </div>
        </div>
        
        <h3 className="text-[16px] font-bold text-gray-900 mb-3 line-clamp-1 leading-tight tracking-tight group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center space-x-2">
          <p className="text-xl font-black text-primary-900 leading-none tracking-tight">
            ${(discountPrice || price).toFixed(2)}
          </p>
          {discountPrice && (
            <p className="text-sm font-medium text-gray-400 line-through leading-none opacity-80">
              ${price.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </RouterLink>
  );
};

export default ProductCard;
