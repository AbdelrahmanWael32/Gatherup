import React, { useState } from "react";
import { Input, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BookTickets = () => {
  const navigate = useNavigate();

  const [card, setCard] = useState({
    cardholderName: "",
    cardNumber: "",
    cvv: "",
    expirationDate: "",
  });

  const [errors, setErrors] = useState([]);

  const handelCheckOut = (e) => {
    e.preventDefault();
    const newErrors = [];
    const { cvv, cardholderName, cardNumber, expirationDate } = card;

    if (!cardholderName.trim()) {
      newErrors.push("Cardholder name is required");
    }

    if (!cardNumber.trim() || cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.push("Card number must be 16 digits");
    }

    if (
      !expirationDate.trim() ||
      expirationDate.length !== 5 ||
      !expirationDate.includes("/")
    ) {
      newErrors.push("Expiration date must be in MM/YY format");
    }

    if (!cvv.trim() || cvv.length !== 3) {
      newErrors.push("CVV must be 3 digits");
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      Swal.fire({
        title: "Payment Successful!",
        text: "Your tickets have been booked successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <div className="flex justify-center items-center mt-[5rem]">
      <form
        onSubmit={handelCheckOut}
        className="w-full max-w-sm p-2 md:p-10 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Payment Details
        </h2>
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 block font-medium text-brand-secondary"
        >
          Cardholder Name
        </Typography>
        <Input
          placeholder="e.g John Doe"
          className="!border-t-blue-gray-200 focus:!border-brand-primary"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={card.cardholderName}
          onChange={(e) => setCard({ ...card, cardholderName: e.target.value })}
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
          className="!border-t-blue-gray-200 focus:!border-brand-primary"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={card.cardNumber
            .replace(/\s/g, "")
            .replace(/(\d{4})/g, "$1 ")
            .trim()}
          onChange={(e) =>
            setCard({ ...card, cardNumber: e.target.value.replace(/\D/g, "") })
          }
        />

        <div className="mt-4 flex flex-col sm:flex-row">
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
              className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 focus:placeholder:text-brand-primary  placeholder:opacity-100 focus:!border-brand-primary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              containerProps={{
                className: "!min-w-0",
              }}
              value={card.expirationDate
                .replace(/[^0-9]/g, "")
                .replace(/(\d{2})(\d{1,2})/, "$1/$2")
                .substring(0, 5)}
              onChange={(e) =>
                setCard({ ...card, expirationDate: e.target.value })
              }
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
              className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 focus:placeholder:text-brand-primary  placeholder:opacity-100 focus:!border-brand-primary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              containerProps={{
                className: "!min-w-0",
              }}
              value={card.cvv.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1")}
              onChange={(e) => setCard({ ...card, cvv: e.target.value })}
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
          <Button type="submit" className="mt-4 bg-brand-primary">
            Done
          </Button>
        </div>
        {errors.length > 0 && (
          <div className="mt-4 text-center text-red-500 text-sm">
            {errors.map((err, i) => (
              <p key={i}> {err}</p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default BookTickets;
