import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { FaExchangeAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import CanvasLoader from "./Loader";
import axios from "axios";
const MyBookingsCard = (params) => {
  const flight = params.data;
  const input = params.seats;
  const date = new Date(params.date).toDateString();

  return (
    // <div>
    //     {params.data.flightName}
    // </div>
    <div className=" w-[70%] bg-black-100 px-[20px] py-[20px] rounded-[20px] ">
        <div>
          <h1 className="px-[15px]  my-[10px]">
            Departure Date:{" "}
            <span className="text-green-400">
              {new Date(flight.fromDate).toDateString()}
            </span>
          </h1>
          <div className="flex items-center">
            <img
              src={flight.image}
              alt={flight.name}
              className="h-[50px] w-[50px] rounded-[50%] bg-white  mx-[10px]"
            />
            <h3 className="text-gray-400 text-[24px] flex flex-col font-bold">
              {flight.flightName}
              <span className="text-[10px] text-white">{flight.flightId}</span>
            </h3>
            <h1 className="flex ml-[auto] items-center">
              <span className="text-white px-[5px] text-lg font-semibold">
                Seats:
              </span>
              <span className=" text-black text-lg font-bold bg-[#00FF00] px-[3px] rounded-[50%]">
                {flight.seats}
              </span>
            </h1>
          </div>
          <h3 className="text-white text-[25px] font-bold flex justify-center items-center">
            {flight.fromPlace}
            <span className="px-[5px] text-[15px] text-[#797EF6]">
              <FaExchangeAlt />
            </span>
            {flight.toPlace}
          </h3>
        </div>
        <div className="w-full  h-[fit] flex justify-center items-center overflow-hidden">
          <div className="w-[100%] h-[100%] flex flex-col items-end  border border-l-0 border-t-0 border-b-0 boeder-white px-[20px] py-[10px]">
            <h1 className="text-gray-300 text-lg">{flight.fromAirport}</h1>
            <h1>{flight.fromTime}</h1>
          </div>
          <div className="w-[100%] border border-l-1 border-t-0 border-b-0 border-r-0 boeder-white h-[100%] px-[20px] py-[10px]">
            <h1 className="text-gray-300 text-lg">{flight.toAirport}</h1>
            <h1>{flight.toTime}</h1>
          </div>
        </div>
        <div className="flex w-full justify-center my-[10px]">
          <h1 className="text-[#FF6961] text-lg">
            <u>{flight.time}</u>
          </h1>
        </div>
        <div className="mx-[20px] w-[100%]  flex flex-col">
          <h1 className="text-white font-semibold text-lg px-[5px] mr-[20px]">
            Price/head :{" "}
            <span className="text-red-600">{" " + flight.price}</span>
          </h1>
          <div className="flex items-center">
            <h1 className=" font-semibold text-xl px-[5px] text-[#00FF00]">
              Booked Seats : {" " + input}{" "}
            </h1>
            <h1 className="ml-[auto] mr-[20px] ">
              Booked On: <span className="text-[#797EF6]">{" " + date}</span>
            </h1>
          </div>

          {/* <button
            onClick={handleSubmit}
            className="bg-[#00FF00] text-black px-[30px] rounded-[20px] mt-[20px] text-xl font-bold w-[50%] mx-[auto]"
          >
            Book Now
          </button> */}
        </div>
      </div>
  );
};

const MyBookings = (params) => {
  const userId = localStorage.getItem("userId");
  const [isLoading, setIsLoading] = useState(true);
  const [arr, setArr] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_PATH}/api/air/get/myBookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    })
      .then((response) => response.json())
      .then((newData) => {
        //console.log(newData.myBookings);
        setArr(newData.myBookings);
        //   setData(newData.data[0]);
        //   if (newData.myBooking != null) {
        //     setInput(newData.myBooking.seats);
        //   }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Canvas className=" w-[fit] flex items-center justify-center">
        <CanvasLoader />
      </Canvas>
    );
  }
  return (
    <div>
      <Navbar />

      <div className="mt-[70px] flex flex-col items-center ">
        <h1 className="my-[30px] text-3xl">My Bookings</h1>
        {arr.map((mybook, index) => (
          <div key={index} className="w-full  flex flex-col items-center my-[10px]">
            <MyBookingsCard
              key={index}
              data={mybook._id}
              seats={mybook.seats}
              date={mybook.bookedDate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
