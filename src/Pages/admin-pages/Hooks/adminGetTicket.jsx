import { createContext, useContext, useState } from "react";

const GetTicket = createContext();

const TicketContext = ({ children }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [allTickets, setAllTickets] = useState(null);
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
