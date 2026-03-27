import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
        {children}
      </QueryClientProvider>
    </Provider>
  );
};

export default Providers;
