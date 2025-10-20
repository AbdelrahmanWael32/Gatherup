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
  return (
    <div className="w-full">
      <Header></Header>

      <Routes>
        <Route path="/about" element={<About />}></Route>
        <Route path="/book-tickets" element={<BookTickets />}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/events" element={<Events></Events>}></Route>
        <Route
          path="/events/category/:category"
          element={<Events></Events>}
        ></Route>
        <Route
          path="/event-details/:id"
          element={<EventDetails></EventDetails>}
        ></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/my-tickets" element={<MyTickets />}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/sign-up" element={<Signup></Signup>}></Route>
      </Routes>

      <Footer></Footer>
    </div>
  );
};

export default App;
