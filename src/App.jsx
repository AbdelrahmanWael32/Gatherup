import { Routes, Route } from "react-router-dom";
import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";
import AuthContext from "./hooks/useLogin";
import CheckAdmin from "./Components/auth/CheckAdmin";
import TicketContext from "./Pages/admin-pages/Hooks/adminGetTicket";

const App = () => {
  return (
    <AuthContext>
      <Routes>
        <Route path="/*" element={<UserLayout />} />
        <Route
          path="/admin/*"
          element={
            <CheckAdmin>
              <TicketContext>
                <AdminLayout />
              </TicketContext>
            </CheckAdmin>
          }
        />
      </Routes>
    </AuthContext>
  );
};

export default App;
