import React, { useEffect } from "react";
//import { IoIosSwapHorizontal } from "react-icons/io";
import { FaExchangeAlt } from "react-icons/fa";
import { Canvas } from "@react-three/fiber";
import CanvasLoader from "./Loader";
import axios from "axios";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import { data } from "../constants/Data";
//import { flights } from "../constants/Flight";
import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { textVariant } from "../utils/motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ExperienceCard = ({ flight }) => {
  const navigate = useNavigate();
  const handleBook = (e) => {
    e.preventDefault();

    //console.log(flight._id);
    navigate("/form/" + flight._id);
  };
  const handleBookings = (e) => {
    e.preventDefault();

    //console.log(flight._id);
    navigate("/adminbookings/" + flight._id);
  };
  const handleDelete = async (e) => {
    e.preventDefault();

    // console.log(flight._id);
    // navigate("/form/" + flight._id);
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      // Delete the item
      //console.log("UHV");
      try {
        const url = `${import.meta.env.VITE_APP_API_PATH}/api/air/delete/id`;
        const { data: res } = await axios.post(url, { ...data, _id: flight._id });
        //console.log(res);
        alert(res.message);
        //navigate("/admin");
        // localStorage.setItem("userId", res.userId);
         window.location.reload();
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          //console.log(error);
          alert(error.response.data);
          setLoading(false);
        }
      }
    }
  };
  //console.log(flight);
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#10301f",
        color: "#00FF00",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #10301f" }}
      date={new Date(flight.fromDate).toDateString()}
      iconStyle={{ background: "#FFFF" }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={flight.image}
            alt={flight.flightName}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
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
      <div className="mx-[20px]">
        <h1 className="text-white font-semibold text-xl px-[5px]">
          {flight.price}
        </h1>
        <div>
          <button
            onClick={handleBook}
            className="bg-[#00FF00] text-black px-[30px] mr-[10px] rounded-[20px] m-[2px] text-xl font-bold"
          >
            Edit
          </button>
          <button
            onClick={handleBookings}
            className="bg-[#797EF6]  text-white  px-[30px] mr-[10px] rounded-[20px] m-[2px] text-xl font-bold"
          >
            Bookings
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-[30px] mx-[10px] rounded-[20px] m-[2px] text-xl font-bold"
          >
            Delete
          </button>
        </div>
      </div>
    </VerticalTimelineElement>
  );
};

const AdminBody = (props) => {
  const [input, setInput] = useState("");
  //console.log(props.flights);
  const [flights, setFlight] = useState([]);
  const [arr, setArray] = useState(flights);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_PATH}/api/air/get`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((newData) => {
        setFlight(newData);
        setArray(newData);
        //console.log(newData);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setInput(value);
    setArray(
      flights.filter((element) =>
        element.flightName.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  if (isLoading) {
    return (
      <Canvas className=" w-[fit] flex items-center justify-center">
        <CanvasLoader />
      </Canvas>
    );
  }
  return (
    <div className="bg-transparent">
      <motion.div variants={textVariant()}>
        <div className="w-fill flex  top-0 justify-center">
          <input
            onChange={handleInput}
            className="h-[35px] w-[50vw]  m-[20px] rounded-[20px] px-[20px]"
            type="text "
            placeholder="Search.."
          />
        </div>
        <p className={`${styles.sectionSubText} text-center`}>
          Available flights
        </p>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {arr.map((flight, index) => {
            //console.log(flight);
            //console.log(props.filter);
            if (props.filter) {
              if (
                props.fromDate != null &&
                new Date(props.fromDate) < new Date(flight.fromDate)
              ) {
                if (
                  props.to.name.common == "" &&
                  flight.fromPlace == props.from.name.common
                ) {
                  return (
                    <ExperienceCard
                      key={`experience-${index}`}
                      flight={flight}
                    />
                  );
                } else if (
                  props.from.name.common == "" &&
                  flight.toPlace == props.to.name.common
                ) {
                  return (
                    <ExperienceCard
                      key={`experience-${index}`}
                      flight={flight}
                    />
                  );
                } else if (
                  props.from.name.common != "" &&
                  props.to.name.common != ""
                ) {
                  if (
                    flight.fromPlace == props.from.name.common &&
                    flight.toPlace == props.to.name.common
                  ) {
                    return (
                      <ExperienceCard
                        key={`experience-${index}`}
                        flight={flight}
                      />
                    );
                  }
                }
              }
            } else {
              return (
                <ExperienceCard key={`experience-${index}`} flight={flight} />
              );
            }
          })}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default AdminBody;
// export default Experience;
