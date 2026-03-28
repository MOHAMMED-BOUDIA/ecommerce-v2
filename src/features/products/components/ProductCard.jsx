import React, { memo, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../wishlist/wishlistSlice';
import { HiOutlineShoppingBag, HiOutlineHeart, HiHeart, HiStar } from 'react-icons/hi2';
import { toast } from 'react-hot-toast';
import Button from '../../../components/ui/Button';

const ProductCard = memo(({ product }) => {
  const dispatch = useDispatch();
  const { id, title, price, image, category, rating, discountPrice, slug } = product;

  const wishlistItems = useSelector(state => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addItem({ ...product, quantity: 1 }));
    toast.success(`${title} added to bag!`, {
      icon: <HiOutlineShoppingBag className="text-emerald-500" />,
    });
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
      toast.success("Removed from Archive");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to Archive");
    }
  };

  const optimizedImage = useMemo(() => {
    if (!image || !image.includes('unsplash.com')) return image;
    try {
      const url = new URL(image);
      url.searchParams.set('auto', 'format');
      url.searchParams.set('q', '70');
      url.searchParams.set('w', '500');
      url.searchParams.set('fit', 'crop');
      return url.toString();
    } catch (e) {
      return image;
    }
  }, [image]);

  return (
    <article 
      className="group block bg-white rounded-[2rem] overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 relative"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-50 p-6 flex items-center justify-center">
        <RouterLink to={`/product/${slug || id}`} className="block w-full h-full" aria-label={`View details for ${title}`}>
          <img
            src={optimizedImage}
            alt={title}
            className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-700"
          />
        </RouterLink>

        {/* Wishlist Link/Button */}
        <button 
          onClick={handleWishlistToggle}
          aria-label={isInWishlist ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-20 ${
            isInWishlist 
              ? "bg-rose-50 text-rose-500 border border-rose-100" 
              : "bg-white/80 backdrop-blur-md text-slate-400 hover:text-rose-500 hover:bg-white"
          }`}
        >
          {isInWishlist ? <HiHeart size={18} /> : <HiOutlineHeart size={18} />}
        </button>

        {/* Discount Badge */}
        {discountPrice && (
          <div className="absolute top-4 left-4 py-1.5 px-3 rounded-xl bg-slate-950 text-white text-[9px] font-black uppercase tracking-widest shadow-lg">
            Tactical Drop
          </div>
        )}
        
        {/* Quick Add Overlay */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
           <Button 
            onClick={handleAddToCart}
            className="w-full h-12 flex items-center justify-center bg-emerald-500 border-none hover:bg-emerald-400 text-slate-950 rounded-xl shadow-xl shadow-emerald-500/20 font-black uppercase italic tracking-tighter text-xs"
           >
             <HiOutlineShoppingBag className="mr-2" size={16} />
             Add To Bag
           </Button>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-5 md:p-6 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
            {category}
          </span>
          {rating && (
            <div className="flex items-center text-slate-900 text-[10px] font-black italic tracking-tighter bg-slate-50 px-2 py-1 rounded-lg">
              <HiStar className="mr-0.5 text-yellow-400" size={12} />
              <span>{(rating.rate || rating).toFixed(1)}</span>
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-black text-slate-950 line-clamp-1 uppercase italic tracking-tighter">
          <RouterLink to={`/product/${slug || id}`}>{title}</RouterLink>
        </h3>
        
        <div className="flex items-center gap-3">
          <p className="text-xl font-black text-slate-900 italic tracking-tighter">
            {product.price?.toLocaleString()} DH
          </p>
          {discountPrice && (
            <p className="text-sm font-bold text-slate-400 line-through italic opacity-60">
              {discountPrice.toLocaleString()} DH
            </p>
          )}
        </div>
      </div>
    </article>
  );
});

export default ProductCard;