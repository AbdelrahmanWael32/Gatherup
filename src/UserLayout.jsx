import Footer from "./Components/footer/Footer";
import Header from "./Components/header/Header";
import Home from "./Pages/home/Home";
import Login from "./Pages/login/Login";
import MyTickets from "./Pages/myTickets/MyTickets";
import About from "./Pages/about/About";
import BookTickets from "./Pages/book-tickets/BookTickets";
import Contact from "./Pages/contact/Contact";
import Events from "./Pages/events/Events";
import EventDetails from "./Pages/event-details/EventDetails";
import Profile from "./Pages/profile/Profile";
import Signup from "./Pages/signup/Signup";
import NotFound from "./Pages/notFound/NotFound";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import CheckLogin from "./Components/auth/CheckLogin";
import EditProfile from "./Pages/edit-profile/ُEditProfile";

const UserLayout = () => {
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="w-full">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route index element={<Home />} />
        <Route
          path="profile"
          element={
            <CheckLogin>
              <Profile />
            </CheckLogin>
          }
        />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="about" element={<About />} />
        <Route path="book-tickets" element={<BookTickets />} />
        <Route path="contact" element={<Contact />} />
        <Route path="events" element={<Events />} />
        <Route
          path="event-details/:_id"
          element={<EventDetails setSelectedEvent={setSelectedEvent} />}
        />

        <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="my-tickets"
          element={
            <MyTickets
              selectedEvent={selectedEvent}
              setSelectedEvent={setSelectedEvent}
            />
          }
        />

        <Route path="sign-up" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default UserLayout;
