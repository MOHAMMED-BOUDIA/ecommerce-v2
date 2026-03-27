import React from 'react';
import { Link } from 'react-router-dom';
import { HiHome, HiChevronRight } from 'react-icons/hi';
import { clsx } from 'clsx';

/**
 * Premium Reusable Breadcrumb Component
 */
const Breadcrumb = ({ items = [], className = '' }) => {
  return (
    <nav className={clsx('flex py-3 text-slate-500 overflow-x-auto no-scrollbar select-none', className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-2 md:space-x-3 whitespace-nowrap px-4 md:px-0">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary-600 transition-colors"
          >
            <HiHome className="mr-2 h-4 w-4" />
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <HiChevronRight className="h-4 w-4 text-slate-300 mx-1" />
              {item.path ? (
                <Link
                  to={item.path}
                  className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary-600 transition-colors md:ml-2"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="ml-1 text-xs font-extrabold uppercase tracking-widest text-slate-900 md:ml-2">
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
