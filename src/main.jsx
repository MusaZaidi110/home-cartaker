import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
// import { AuthProvider } from './services/common/AuthProvider';
// import ProtectedRoute from './services/common/ProtectedRoute';
import './index.css';
import "react-toastify/dist/ReactToastify.css";
import 'leaflet/dist/leaflet.css';

// Layouts
import WebsiteLayout from './components/our-website/WebsiteLayout';
// import DashboardLayout from './layouts/DashboardLayout';

// Frontend Pages
import Home from './components/our-website/Pages/Home';
import Contact from './components/our-website/Pages/Contact';
import Auth from './components/auth/Auth';
import About from './components/our-website/Pages/About';
import ServiceDetails from './components/our-website/our-service/ServiceDetails';
import JoinAsVendor from './components/our-website/Pages/JoinAsVendor';
import RequestService from './components/our-website/Pages/RequestService';


// Dashboard Pages
// import UserDashboard from './components/dashboard/user/Dashboard';
// import VendorDashboard from './components/dashboard/vendor/Dashboard';

const router = createBrowserRouter([
  {
    element: <WebsiteLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/service/:id',
        element: <ServiceDetails />
      },
      {
        path: '/join-as-vendor',
        element: <JoinAsVendor />
      }
      ,
      {
        path: '/request-service',
        element: <RequestService />
      }
    ]
    // },
    // {
    //   element: (
    //     <ProtectedRoute allowedRoles={['user']}>
    //       <DashboardLayout />
    //     </ProtectedRoute>
    //   ),
    //   children: [
    //     {
    //       path: '/user/dashboard',
    //       element: <UserDashboard />
    //     },
    //     // Add more user routes here
    //   ]
    // },
    // {
    //   element: (
    //     <ProtectedRoute allowedRoles={['vendor']}>
    //       <DashboardLayout />
    //     </ProtectedRoute>
    //   ),
    //   children: [
    //     {
    //       path: '/vendor/dashboard',
    //       element: <VendorDashboard />
    //     },
    //     // Add more vendor routes here
    //   ]
  },
  {
    path: '/auth',
    element: <Auth />
  }
  // Add a catch-all route for 404 pages if needed
  // {
  //   path: '*',
  //   element: <Navigate to="/" replace />
  // }
]);

createRoot(document.getElementById('root')).render(
  // <AuthProvider>
  <RouterProvider router={router} />
  // </AuthProvider>
);