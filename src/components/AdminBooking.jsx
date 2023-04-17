import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import AdminNavbar from "./AdminNavbar";
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
        <div className="w-[100%] h-[100%] flex flex-col items-end border border-l-0 border-t-0 border-b-0 boeder-white px-[20px] py-[10px]">
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
      </div>
    </div>
  );
};

const AdminBookings = (params) => {
  //const userId = localStorage.getItem("userId");
  const [isLoading, setIsLoading] = useState(true);
  const [arr, setArr] = useState([]);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_APP_API_PATH}/api/air/get/adminBookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
      })
        .then((response) => response.json())
        .then((newData) => {
          console.log(newData);
          setData(newData);
          //setArr(newData.myBookings);
          //   setData(newData.data[0]);
          //   if (newData.myBooking != null) {
          //     setInput(newData.myBooking.seats);
          //   }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    } else {
      alert("something went wrong");
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <Canvas className=" w-[fit] flex items-center justify-center">
        <CanvasLoader />
      </Canvas>
    );
  }
  return (
    <div >
      <AdminNavbar />

      <div className="mt-[70px] mb-[50px] flex flex-col items-center ">
        <h1 className="my-[30px] text-3xl">Flight Details</h1>
        <MyBookingsCard data={data} seats={data.seats} date={data.fromDate} />
        <h1 className="my-[30px] text-3xl">Booked By</h1>

        {data.bookings.map((mybook, index) => (
          <div
            key={index}
            className=" flex  bg-black-100 w-[70%] py-[30px] px-[20px] my-[10px] rounded-[20px]"
          >
            <div className="flex flex-col ">
              <h1 className="text-2xl font-semibold">
                {mybook._id.firstName + " " + mybook._id.lastName}
              </h1>
              <h3 className="text-gray-500">{mybook._id.email}</h3>
            </div>
            <div className="flex flex-col ml-auto justify-end items-end">
              <h1 className="text-xl font-semibold">
                {" "}
                <span className="text-green-700">Seats Booked: </span>{" "}
                {mybook.seats}
              </h1>
              <div className="mr-auto">
                <h3 className="text-[10px]">Booked Date:</h3>
                <h3 className="text-[#797EF6]">{new Date(mybook.bookedDate).toDateString()}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;
