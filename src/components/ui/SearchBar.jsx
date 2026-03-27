import React, { useState } from 'react';
import { HiOutlineSearch, HiX } from 'react-icons/hi';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

/**
 * Premium Reusable SearchBar Component
 */
const SearchBar = ({ 
  placeholder = 'Search products, brands and categories...', 
  className = '',
  onSearch,
  size = 'md' // sm, md, lg
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/shop?search=${query}`);
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  const sizes = {
    sm: 'h-10 text-xs px-3',
    md: 'h-12 text-sm px-4',
    lg: 'h-14 text-base px-5'
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={clsx('relative w-full max-w-xl group', className)}
    >
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors pointer-events-none">
        <HiOutlineSearch size={size === 'sm' ? 18 : size === 'md' ? 22 : 26} />
      </div>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          'w-full bg-slate-50 border-2 border-transparent rounded-2xl transition-premium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-50 px-12 focus:bg-white focus:border-primary-500 font-bold tracking-tight',
          sizes[size]
        )}
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
        >
          <HiX size={size === 'sm' ? 14 : size === 'md' ? 16 : 20} />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
