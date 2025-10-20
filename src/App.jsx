import { useState } from "react";
import { Routes, Route } from "react-router-dom";
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

const App = () => {
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="w-full">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/book-tickets" element={<BookTickets />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<Events />} />
        <Route
          path="/event-details/:id"
          element={<EventDetails setSelectedEvent={setSelectedEvent} />}
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/my-tickets"
          element={
            <MyTickets
              selectedEvent={selectedEvent}
              setSelectedEvent={setSelectedEvent}
            />
          }
        />

        <Route path="/sign-up" element={<Signup />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
