import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Snackbar, Alert, CircularProgress } from '@mui/material';
import { useAnimateOnScroll } from './AnimateWatcher';
import {
  RestrictedRoute,
  PrivateRoute,
  MobileOnlyRoute,
} from './routes/Routes';
import { useAppSelector, useAppDispatch } from './store';
import { clearAlert } from './store/slices/AuthSlice';
const FinanceTable = lazy(
  () => import('./components/Main/MainPageComponents/FinanceTable')
);
import LoginPage from './pages/LoginPage/LoginPage';
import FinancesPage from './pages/FinancesPage/FinancesPage';
import { selectIsAlert, selectType } from './store/selectors';
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const StatisticsPage = lazy(
  () => import('./pages/StatisticsPage/StatisticsPage')
);

function App() {
  useAnimateOnScroll();
  const dispatch = useAppDispatch();
  const isAlert = useAppSelector(selectIsAlert);
  const alertType = useAppSelector(selectType);

  const handleCloseAlert = () => {
    dispatch(clearAlert());
  };

  return (
    <Suspense
      fallback={
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
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <CircularProgress sx={{ color: '#8d52da' }} size={120} />
        </div>
      }
    >
      <Routes>
        <Route
          path="/login"
          element={<RestrictedRoute component={LoginPage} redirectTo="/main" />}
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute component={RegisterPage} redirectTo="/main" />
          }
        />

        <Route
          path="/main"
          element={<PrivateRoute component={MainPage} redirectTo="/login" />}
        >
          <Route index element={<FinanceTable />} />
          <Route path="home" element={<FinanceTable />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route
            path="finances"
            element={
              <MobileOnlyRoute
                component={FinancesPage}
                redirectTo="/main/home"
              />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <Snackbar
        open={Boolean(isAlert)}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alertType} onClose={handleCloseAlert}>
          {isAlert}
        </Alert>
      </Snackbar>
    </Suspense>
  );
}

export default App;
