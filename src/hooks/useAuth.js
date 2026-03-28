import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    role: auth.role,
    isAdmin: auth.role === 'admin',
    isUser: auth.role === 'user',
    logout: handleLogout,
  };
};
