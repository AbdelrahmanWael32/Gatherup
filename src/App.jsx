import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserLayout />} />
      <Route path="/admin/*" element={<AdminLayout />} />
    </Routes>
  );
};

export default App;
