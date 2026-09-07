import { Navigate } from 'react-router-dom';
import type { ComponentType } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../store';
import { useMediaQuery } from '@mui/material';
import { selectIsAuthenticated, selectLoader } from '../store/selectors';

interface RouteProps {
  component: ComponentType;
  redirectTo?: string;
}

export const PrivateRoute = ({
  component: Component,
  redirectTo = '/login',
}: RouteProps) => {
  const isAuth = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectLoader);

  if (isLoading) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress sx={{ color: '#8d52da' }} size={120} />
      </div>
    );
  }

  return isAuth ? <Component /> : <Navigate to={redirectTo} replace />;
};

export const RestrictedRoute = ({
  component: Component,
  redirectTo = '/home',
}: RouteProps) => {
  const isAuth = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectLoader);

  if (isLoading) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress sx={{ color: '#8d52da' }} size={120} />
      </div>
    );
  }

  return isAuth ? <Navigate to={redirectTo} replace /> : <Component />;
};

export const MobileOnlyRoute = ({
  component: Component,
  redirectTo = '/main/home',
}: RouteProps) => {
  const isMobile = useMediaQuery('(max-width:768px)');

  return isMobile ? <Component /> : <Navigate to={redirectTo} replace />;
};
