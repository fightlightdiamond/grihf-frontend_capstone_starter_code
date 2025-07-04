import { useLocation, useNavigate } from 'react-router';
import { type ReactNode, useEffect } from 'react';
import { AuthContext } from '../hooks/useContexts';
import { login as loginAPI } from '../../features/auth/store/authAPI';
import { useAppDispatch } from '../hooks';
import { useTypedSelector } from '../../app/stores';
import {
  logout as LogoutRedux,
  selectAuth,
} from '../../features/auth/store/authSlice';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useTypedSelector(selectAuth);

  const { state } = useLocation();
  useEffect(() => {
    if (authState) navigate(state?.path || '/');
  }, [authState, navigate, state?.path]);

  const isUserAuthenticated = () => authState !== null;

  const login = (email: string, password: string) => {
    dispatch(loginAPI({ email, password }));
  };

  const logout = () => {
    dispatch(LogoutRedux());
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        isUserAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
