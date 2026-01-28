import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Register from "../auth/Register";

import UserPosts from "../pages/userPosts";
import ClientLayout from "../layouts/ClientLayout";
import AdminLayout from "../layouts/AdminLayout";

import FeedPage from "../pages/FeedPage";
import CreatePostPage from "../pages/CreatePostPage";
import ChatPage from "../pages/ChatPage";
import ProfilePage from "../pages/ProfilePage"; 

import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageCities from "../pages/Admin/ManageCities";
import ManageSpots from "../pages/Admin/ManageSpots";
import ManageScams from "../pages/Admin/ManageScams";
import ManagePosts from "../pages/Admin/ManagePosts";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Navigate to="/feed" />} />

      {/* Protected Client c'est le client qui est connecté */}
      <Route element={<PrivateRoute />}>
        <Route element={<ClientLayout />}>
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/chat/:cityId" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/userPosts" element={<UserPosts />} />
        </Route>
      </Route>

      {/* Protected Admin c'est le admin qui est connecté */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/cities" element={<ManageCities />} />
          <Route path="/admin/spots" element={<ManageSpots />} />
          <Route path="/admin/scams" element={<ManageScams />} />
          <Route path="/admin/posts" element={<ManagePosts />} />
        </Route>
      </Route>

      {/* Not found c'est la route qui est connecté n'est pas trouvé*/}
      <Route path="*" element={<div className="p-6 text-white">404 Not Found</div>} />
    </Routes>
  );
}
