import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import ManageTours from "../../Pages/ManageTours";
import ManageBlogs from "../../Pages/ManageBlogs";
import "./AdminDashboard.css"; // Custom styles

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* Sidebar Section */}
      <div className="sidebar">
        <h2 className="sidebar-title">Admin Dashboard</h2>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/admin/tours"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
               Manage Tours
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/blogs"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
               Manage Blogs
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Content Section */}
      <div className="content">
        <Routes>
          <Route path="tours" element={<ManageTours />} />
          <Route path="blogs" element={<ManageBlogs />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
