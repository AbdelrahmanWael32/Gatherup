import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [eventError, setEventError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const eventsData = [
    {
      id: 1,
      image: "/sport1.png",
      title: "Youth Basketball Championship",
      price: 100,
      date: "December 15, 2025",
      Location: "Al Gezira Sports Club – Cairo",
      description: `Experience the thrill of live basketball at the Youth Basketball Championship 2025!
                     Watch the best young players battle it out in an energetic and competitive atmosphere filled with excitement, cheers, and music.
                     Bring your friends or family and enjoy an unforgettable sporting event that celebrates talent, teamwork, and passion.`,
      price: 100,
    },
    {
      id: 2,
      image: "/event2.png",
      title: "Outdoor Movie Night",
      price: 50,
      date: "October 3, 2025",
      time: "🕒 7:00 PM – 11:00 PM",
      Location: "Zed Park – Sheikh Zayed, Giza",
      description: `Enjoy a magical night under the stars! 
Join us for an Outdoor Movie Night featuring one of the latest blockbuster films in a cozy open-air setting.
Relax on bean bags or picnic chairs, grab some popcorn , and enjoy the fresh evening breeze with your loved ones.
Perfect for families, couples, and friends who want to unwind and enjoy a cinematic experience under the open sky.`,
    },
    {
      id: 3,
      image: "/event4.png",
      title: "Summer Beats Live Concert",
      price: 250,
      date: "August 8, 2025",
      Location: "Cairo Festival City Amphitheater – New Cairo",
      time: "🕒 8:00 PM",
      description: `Get ready for an unforgettable night of music, lights, and energy! 
Join us at the *Summer Beats Live Concert 2025*, featuring some of Egypt’s top pop and indie artists performing live on stage.
Enjoy the electric atmosphere, amazing light shows, and a full night of entertainment under the summer sky. 
Perfect for music lovers, friends, and anyone who wants to dance, sing, and celebrate the season in style! `,
    },
  ];

  const getEventDetails = () => {
    try {
      const foundEvent = eventsData.find((e) => e.id === parseInt(id));
      if (!foundEvent) {
        setEventError("Event not found!");
      } else {
        setEvent(foundEvent);
      }
    } catch (e) {
      setEventError(e.message);
    }
  };

  useEffect(() => {
    getEventDetails();
  }, [id]);

  if (eventError) {
    return <h1 className="text-red-500 text-xl text-center">{eventError}</h1>;
  }

  if (!event) {
    return <p className="text-center text-gray-500 mt-12">Loading event...</p>;
  }

  return (
    <div className=" py-12 px-6">
      <h1 className="text-3xl font-semibold text-brand-dark mb-3">
        {event.title}
      </h1>

      <div className="flex flex-col-reverse md:flex-row md:gap-[2rem]">
        <div>
          <p className="text-base md:text-lg text-brand-secondary whitespace-pre-line">
            {event.description}
          </p>
          <p className="text-brand-secondary text-lg mb-2 mt-7">
            📅{event.date}
          </p>
          <p className="text-brand-secondary text-lg mb-2">{event.time}</p>
          <p className="text-brand-secondary text-lg mb-2">
            📍{event.Location}
          </p>
          <p className="text-brand-secondary text-lg mb-2">💰{event.price}</p>
          <div className="flex justify-between">
            <Link to={"/book-tickets"}>
              <Button color="blue">book now</Button>
            </Link>
            <Button
              variant="text"
              onClick={() => navigate(-1)}
              className="mt-2 text-blue-600"
            >
              ← Go Back
            </Button>
          </div>
        </div>
        <img
          src={event.image}
          alt={event.title}
          className="w-[90%] md:w-[50%] max-h-[350px] object-cover rounded-2xl mb-6 shadow-lg mx-auto "
        />
      </div>
    </div>
  );
};

export default EventDetails;
