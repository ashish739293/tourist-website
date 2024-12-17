import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Router from '../../Router/Routers';
import Footer from '../Footer/Footer';
import AdminDashboard from '../Dashboard/AdminDashboard';

const Layout = () => {
  const location = useLocation();

  // List of routes where the sidebar should be visible
  const adminRoutes = ['/admin', '/admin/tours', '/admin/blogs'];

  // Check if the current route matches any of the admin routes
  const showSidebar = adminRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div >
      {/* Always show the header */}
      <Header />
    
      {/* Main content area */}
      <div style={{ flex: 1 }}>
        <Router />
      </div>

      {/* Render Footer only if not an admin-specific route */}
      {!showSidebar && <Footer />}
    </div>
  );
};

export default Layout;
