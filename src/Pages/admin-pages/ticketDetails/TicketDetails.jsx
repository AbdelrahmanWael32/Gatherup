import { adminGetTicket } from "../Hooks/adminGetTicket";

const TicketDetails = () => {
  const { selectedTicket, allTickets } = adminGetTicket();
  console.log(selectedTicket);

  const { title, date, id, location, price, image } = selectedTicket;
  return (
    <div className="flex m-0 lg:px-32 p-4 flex-col bg-brand-secondary gap-2">
      <span className="text-xl text-center">{title}</span>
      <div className="flex text-xl flex-col">
        <span>Id:{id}</span>
        <span>Data: {date}</span>
        <span>Location: {location}</span>
        <span>Price: {price}</span>
        <span></span>
        <div className="flex justify-center">
          <img src={image} className="md:w-2/5 lg:w-2/3 p-4 max-w-md"></img>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
