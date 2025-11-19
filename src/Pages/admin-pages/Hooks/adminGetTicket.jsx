import { createContext, useContext, useState } from "react";

const GetTicket = createContext();

const TicketContext = ({ children }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [allTickets, setAllTickets] = useState([]);
  return (
    <GetTicket.Provider
      value={{
        selectedTicket,
        setSelectedTicket,
        allTickets,
        setAllTickets,
      }}
    >
      {children}
    </GetTicket.Provider>
  );
};

export default TicketContext;

export const adminGetTicket = () => useContext(GetTicket);
