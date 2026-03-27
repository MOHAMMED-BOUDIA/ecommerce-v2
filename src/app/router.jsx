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

/**
 * Premium Router Configuration
 */
const LoadingWrapper = ({ children }) => (
  <Suspense fallback={<Loader fullScreen size="lg" text="Synchronizing Data..." />}>
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
      },
      {
        path: 'shop',
        element: <LoadingWrapper><Shop /></LoadingWrapper>,
      },
      {
        path: 'product/:slug',
        element: <LoadingWrapper><ProductDetail /></LoadingWrapper>,
      },
      {
        path: 'cart',
        element: <LoadingWrapper><Cart /></LoadingWrapper>,
      },
      {
        path: 'wishlist',
        element: <LoadingWrapper><Wishlist /></LoadingWrapper>,
      },
      {
        path: 'login',
        element: <LoadingWrapper><Login /></LoadingWrapper>,
      },
      {
        path: 'register',
        element: <LoadingWrapper><Register /></LoadingWrapper>,
      },
      {
        path: 'profile',
        element: <LoadingWrapper><Profile /></LoadingWrapper>,
      },
      {
        path: '404',
        element: <LoadingWrapper><NotFound /></LoadingWrapper>,
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ],
  },
]);