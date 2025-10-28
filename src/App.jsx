import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";
import AuthContext from "./hooks/useLogin";
import CheckAdmin from "./Components/auth/CheckAdmin";

const App = () => {
  return (
    <AuthContext>
      <Routes>
        <Route path="/*" element={<UserLayout />} />
        <Route
          path="/admin/*"
          element={
            <CheckAdmin>
              <AdminLayout />
            </CheckAdmin>
          }
        />
      </Routes>
    </AuthContext>
  );
};

export default App;
