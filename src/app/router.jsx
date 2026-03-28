import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Loader from '../components/ui/Loader';
import ErrorBoundary from '../components/ui/ErrorBoundary';

// Lazy load pages for premium performance
const Home = lazy(() => import('../pages/Home'));
const Shop = lazy(() => import('../pages/Shop'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const Cart = lazy(() => import('../pages/Cart'));
const Wishlist = lazy(() => import('../pages/Wishlist'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Profile = lazy(() => import('../pages/Profile'));
const NotFound = lazy(() => import('../pages/NotFound'));
const NewArrivals = lazy(() => import('../pages/NewArrivals'));
const TacticalGears = lazy(() => import('../pages/TacticalGears'));
const TheLab = lazy(() => import('../pages/TheLab'));
const Checkout = lazy(() => import('../features/checkout/pages/Checkout'));
const OrderSuccess = lazy(() => import('../features/checkout/pages/OrderSuccess'));
const Privacy = lazy(() => import('../pages/Privacy'));
const Cookies = lazy(() => import('../pages/Cookies'));
const Returns = lazy(() => import('../pages/Returns'));

// Optimized Loading Wrapper for better LCP
const LoadingWrapper = ({ children }) => (
  <Suspense fallback={
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950">
      <div className="w-12 h-12 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/50 animate-pulse">
        Initializing System...
      </span>
    </div>
  }>
    {children}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <LoadingWrapper><Home /></LoadingWrapper>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'shop',
        element: <LoadingWrapper><Shop /></LoadingWrapper>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'product/:slug',
        element: <LoadingWrapper><ProductDetail /></LoadingWrapper>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'product/:id',
        element: <LoadingWrapper><ProductDetail /></LoadingWrapper>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'cart',
        element: <LoadingWrapper><Cart /></LoadingWrapper>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'wishlist',
        element: <LoadingWrapper><Wishlist /></LoadingWrapper>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'login',
        element: <LoadingWrapper><Login /></LoadingWrapper>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'register',
        element: <LoadingWrapper><Register /></LoadingWrapper>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'profile',
        element: <LoadingWrapper><Profile /></LoadingWrapper>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'checkout',
        element: <LoadingWrapper><Checkout /></LoadingWrapper>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'order-success',
        element: <LoadingWrapper><OrderSuccess /></LoadingWrapper>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'new-arrivals',
        element: <LoadingWrapper><NewArrivals /></LoadingWrapper>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'tactical-gears',
        element: <LoadingWrapper><TacticalGears /></LoadingWrapper>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'the-lab',
        element: <LoadingWrapper><TheLab /></LoadingWrapper>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'privacy',
        element: <LoadingWrapper><Privacy /></LoadingWrapper>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'cookies',
        element: <LoadingWrapper><Cookies /></LoadingWrapper>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'returns',
        element: <LoadingWrapper><Returns /></LoadingWrapper>,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'categories/tactical',
        element: <Navigate to="/tactical-gears" replace />,
      },
      {
        path: 'about',
        element: <Navigate to="/the-lab" replace />,
      },
      {
        path: '404',
        element: <LoadingWrapper><NotFound /></LoadingWrapper>,
      },
      {
        path: '*',
        element: <LoadingWrapper><NotFound /></LoadingWrapper>,
      },
    ],
  },
]);