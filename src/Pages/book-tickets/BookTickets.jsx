import React from "react";
import { Input, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const BookTickets = () => {
  const [cvv, setCvv] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [expirationDate, setExpirationDate] = React.useState("");
  const [cardholderName, setCardholderName] = React.useState("");
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-auto md:h-[100vh]">
      <div className="w-full max-w-sm ">
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 block font-medium text-brand-secondary focus:!texrt-brand-primary"
        >
          Cardholder Name
        </Typography>
        <Input
          placeholder="e.g John Doe"
          className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300  placeholder:opacity-100 focus:!border-brand-primary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          containerProps={{
            className: "min-w-0",
          }}
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
        />

        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 mt-4 block font-medium text-brand-secondary"
        >
          Card Number
        </Typography>
        <Input
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300  placeholder:opacity-100 focus:!border-brand-primary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          containerProps={{
            className: "min-w-0",
          }}
          value={cardNumber
            .replace(/\s/g, "")
            .replace(/(\d{4})/g, "$1 ")
            .trim()}
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <div className="mt-4 flex">
          <div className="mr-4 w-full md:w-8/12">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-1 block font-medium text-brand-secondary"
            >
              Expiration Date
            </Typography>
            <Input
              placeholder="MM/YY"
              maxLength={5}
              pattern="\d{2}/\d{2}"
              className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300  placeholder:opacity-100 focus:!border-brand-primary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              containerProps={{
                className: "!min-w-0",
              }}
              value={expirationDate
                .replace(/[^0-9]/g, "")
                .replace(/(\d{2})(\d{1,2})/, "$1/$2")
                .substring(0, 5)}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
          </div>
          <div className="w-full md:w-4/12">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-1 block font-medium text-brand-secondary"
            >
              CVV
            </Typography>
            <Input
              placeholder="123"
              maxLength={3}
              pattern="\d{3}"
              className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300  placeholder:opacity-100 focus:!border-brand-primary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              containerProps={{
                className: "!min-w-0",
              }}
              value={cvv.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1")}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            variant="text"
            onClick={() => navigate(-1)}
            className="mt-4 text-blue-600"
          >
            Cancel
          </Button>
          <Button className="mt-4 bg-brand-primary">Done</Button>
        </div>
      </div>
    </div>
  );
};

export default BookTickets;
