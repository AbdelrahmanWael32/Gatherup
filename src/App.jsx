import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";
import AuthContext from "./hooks/useLogin";

const App = () => {
  return (
    <AuthContext>
      <Routes>
        <Route path="/*" element={<UserLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </AuthContext>
  );
};

export default App;
