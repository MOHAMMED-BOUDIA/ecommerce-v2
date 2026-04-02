import { createSlice } from '@reduxjs/toolkit';

const getInitialAuthState = () => {
  try {
    const savedAuth = localStorage.getItem('vanguard_auth');
    if (savedAuth) {
      const parsed = JSON.parse(savedAuth);
      return {
        user: parsed.user || null,
        token: parsed.token || null,
        isAuthenticated: !!parsed.token && !!parsed.user,
        role: parsed.user?.role || null,
      };
    }
  } catch (error) {
    console.error('Failed to restore auth state:', error);
  }
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    role: null,
  };
};

const initialState = getInitialAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.role = action.payload.user?.role || 'user';
      
      // Persist to localStorage
      localStorage.setItem('vanguard_auth', JSON.stringify({
        user: action.payload.user,
        token: action.payload.token,
      }));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.role = null;
      
      // Clear all auth-related persistence
      localStorage.removeItem('vanguard_auth');
      localStorage.removeItem('vanguard_user_profile');
    },
    restoreAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.token && !!action.payload.user;
      state.role = action.payload.user?.role || null;
    },
  },
});

export const { setUser, logout, restoreAuth } = authSlice.actions;
export default authSlice.reducer;
