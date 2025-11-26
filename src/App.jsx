import { Routes, Route } from "react-router-dom";
import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";
import AuthContext from "./hooks/useLogin";
import CheckAdmin from "./Components/auth/CheckAdmin";
import TicketContext from "./Pages/admin-pages/Hooks/adminGetTicket";
import SearchProvider from "./hooks/useSearch";
const App = () => {
  return (
    <AuthContext>
      <Routes>
        <Route
          path="/*"
          element={
            <SearchProvider>
              <UserLayout />
            </SearchProvider>
          
          }
        />
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
