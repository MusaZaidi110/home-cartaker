import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './services/common/AuthProvider';
import './index.css';
import "react-toastify/dist/ReactToastify.css";
import 'leaflet/dist/leaflet.css';

// Layouts 
const WebsiteLayout = React.lazy(() => import('./components/our-website/WebsiteLayout'));
const AdminDashboardLayout = React.lazy(() => import('./components/admin-dashboard/AdminDashboardLayout'));
const UserDashboardLayout = React.lazy(() => import('./components/user-dashboard/UserDashboardLayout'));
const VendorDashboardLayout = React.lazy(() => import('./components/vendor-dashboard/VendorDashboardLayout'));

// Pages
const Home = React.lazy(() => import('./components/our-website/Pages/Home'));
const Contact = React.lazy(() => import('./components/our-website/Pages/Contact'));
const Auth = React.lazy(() => import('./components/auth/Auth'));
const About = React.lazy(() => import('./components/our-website/Pages/About'));
const ServiceDetails = React.lazy(() => import('./components/our-website/our-service/ServiceDetails'));
const JoinAsVendor = React.lazy(() => import('./components/our-website/Pages/JoinAsVendor'));
const RequestService = React.lazy(() => import('./components/our-website/Pages/RequestService'));

// Dashboard Pages

const UserDashboard = React.lazy(() => import('./components/user-dashboard/UserDashboard'));
const VendorDashboard = React.lazy(() => import('./components/vendor-dashboard/VendorDashboard'));
const AdminDashboard = React.lazy(() => import('./components/admin-dashboard/AdminDashboard'));

// Protected Route Limitation
import { ProtectedRoute } from './services/common/ProtectedRoute';
import { AuthRoute } from './components/auth/AuthRoute';
import { CircularProgress } from '@mui/material';

// Create role-based protected routes
const createProtectedRoutes = (role, LayoutComponent, dashboardComponent, additionalRoutes = []) => ({
  element: (
    <AuthProvider>
      <ProtectedRoute allowedRoles={[role]}>
        <LayoutComponent />
      </ProtectedRoute>
    </AuthProvider>
  ),
  children: [
    { path: `/${role}/dashboard`, element: dashboardComponent },
    ...additionalRoutes
  ]
});

const router = createBrowserRouter([
  {
    element: <WebsiteLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/service/:id', element: <ServiceDetails /> },
      { path: '/join-as-vendor', element: <JoinAsVendor /> },
      { path: '/request-service', element: <RequestService /> }
    ]
  },
  createProtectedRoutes('user', UserDashboardLayout, UserDashboard),
  createProtectedRoutes('vendor', VendorDashboardLayout, VendorDashboard),
  createProtectedRoutes('admin', AdminDashboardLayout, AdminDashboard),
  {
    path: '/auth',
    element: (
      <AuthProvider >
        <AuthRoute>
          <Auth />
        </AuthRoute>
      </ AuthProvider>

    )
  },
  { path: '*', element: <Home /> } // Better than redirect for 404 pages
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<CircularProgress />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
