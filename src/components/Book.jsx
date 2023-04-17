import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { FaExchangeAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import CanvasLoader from "./Loader";
import axios from "axios";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
const Book = (params) => {
  const userId = localStorage.getItem("userId");
  const [seats, setSeats] = useState(0);
  const [isBooked, setIsBooked] = useState(false);
  const [date, setIsDate] = useState(new Date());
  
  const [flight, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_APP_API_PATH}/api/air/get/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, bookingId: id }),
      })
        .then((response) => response.json())
        .then((newData) => {
          //console.log(newData.data[0]);
          setData(newData.data[0]);
          if (newData.myBooking != null) {
            setInput(newData.myBooking.seats);
            setIsDate(new Date(newData.myBooking.bookedDate).toDateString());
            setIsBooked(true);
          }
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      //setData(datas);
      setIsLoading(false);
      navigate("/");
    }
  }, [id]);

  const handleInput = (e) => {
    const value = e.target.value;
    if (value > flight.seats) {
      setInput(0);
      alert("Available Seats: " + flight.seats);
    } else {
      setInput(value);
      // var int = flight.seats-value;
      // console.log(int);
      // setData({...flight,seats:int})
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var int = flight.seats - input;
    //console.log(int);
    setData({ ...flight, seats: int });
    const mybooking = {
      _id: id,
      seats: input,
      bookedDate: new Date().toString(),
    };
    const bookings = {
      _id: userId,
      seats: input,
      bookedDate: new Date().toString(),
    };
    try {
      const url = `${import.meta.env.VITE_APP_API_PATH}/api/air/put/bookings`;
      //console.log(url);
      const { data: res } = await axios.post(url, {
        data: { ...flight, seats: int, bookings: bookings },
        myBooking: mybooking,
        userId: userId,
      });
      //console.log(res);
      alert(res);

      // props.update(res);
      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        alert(error);
      }
    }
  };

  if (isLoading) {
    return (
      <Canvas className=" w-[fit] flex items-center justify-center">
        <CanvasLoader />
      </Canvas>
    );
  }
  return (
    <div className="flex flrx-col justify-center">
      <Navbar />
      <div className="mt-[80px] w-[70%] bg-black-100 px-[20px] py-[50px] rounded-[20px] ">
        <div>
          <img
            src={flight.image}
            alt={flight.name}
            className="h-[100px] bg-white mx-auto"
          />
          <div className="flex items-center">
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
          <div className="w-[100%] h-[100%]  border border-l-0 border-t-0 border-b-0 boeder-white px-[20px] py-[10px]">
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
          <h1 className="text-white font-semibold text-xl px-[5px] ml-[auto] mr-[20px]">
            Price : {" " + flight.price}
          </h1>
          <div className="flex items-center">
            <div>
              {isBooked ? (
                <div></div>
              ) : (
                <div className="flex items-center flex-col">
                  <h1>Select number of seats:</h1>
                  <input
                    value={input}
                    onChange={handleInput}
                    type="number"
                    className="px-[10px] m-[7px]"
                  />
                </div>
              )}
            </div>
            <h1 className="text-white font-semibold text-xl px-[5px] ml-[auto] mr-[20px] text-[#797EF6]">
              Seats : {" " + input}{" "}
            </h1>
          </div>

          {isBooked ? (
            <div className="w-full flex flex-col irems-center justify-center pr-[20px]">
              <button
                //onClick={handleSubmit}
                className="bg-red-600 text-gray-300 px-[30px] rounded-[20px] mt-[20px] text-xl font-semibold w-[50%] mx-[auto]"
              >
                Booked Already
              </button>
              <h1 className="mx-auto my-[10px] text-green-500">
                Booked Date: {date}
              </h1>
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-[#00FF00] text-black px-[30px] rounded-[20px] mt-[20px] text-xl font-bold w-[50%] mx-[auto]"
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Book;
