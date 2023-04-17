import { motion } from "framer-motion";
import { styles } from "../styles";
import { useNavigate } from "react-router-dom";
import { BiReset } from "react-icons/bi";
import { MapChart } from "./canvas";
import { FaPlane } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useState } from "react";
import Selector from "./Selector";
import AdminNavbar from "./AdminNavbar";

import { RiCloseCircleLine } from "react-icons/ri";
import AdminBody from "./AdminBody";
const AdminHero = (props) => {
  const [from, setFrom] = useState({
    name: {
      common: "",
      official: "",
      nativeName: {
        fra: { official: "", common: "" },
      },
    },
    latlng: [],
    country: "",
    cca3: "",
  });
  const [to, setTo] = useState({
    name: {
      common: "",
      official: "",
      nativeName: {
        fra: { official: "", common: "" },
      },
    },
    latlng: [],
    country: "",
    cca3: "",
  });
  const [fromDate, setFromDate] = useState(new Date());
  const [filter,setFilter] = useState(false);
  const navigate = useNavigate();
  const [reset, setReset] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    setFrom({
      name: {
        common: "",
        official: "",
        nativeName: {
          fra: { official: "", common: "" },
        },
      },
      latlng: [],
      country: "",
      cca3: "",
    });
    setTo({
      name: {
        common: "",
        official: "",
        nativeName: {
          fra: { official: "", common: "" },
        },
      },
      latlng: [],
      country: "",
      cca3: "",
    });
    setReset(false);
    setFilter(false);
    setFromDate(new Date());
  };

  const handleGo=(e)=>{
    setFilter(true);
    setReset(true);
    console.log("Home",filter);

  }
  return (
    <div>
      <AdminNavbar />
      <div className="w-auto h-auto">
        <section className={` flex  w-auto h-fit mx-auto`}>
          <div className="flex flex-col  w-[auto] mx-[auto] mt-[70px] mb-[50px]">
            <h1 className="mx-[60px] my-[20px] text-5xl">
              Book Your{" "}
              <span className="text-[#00FF00] flex">
                {" "}
                Flight... &nbsp;
                <FaPlane />
              </span>
            </h1>
            <div
              className={`inset-0 max-w-7xl mx-auto  flex flex-row items-start  xl:w-[50vw] w-auto gap-5`}
            >
              <div className=" w-[100%] flex gap-10 px-[50px]">
                <section>
                  <h1 className="text-3xl font-bold px-[20px] py-[10px]">
                    From :
                  </h1>
                  <Selector adj={to.name.common} setCur={setFrom} data={from} />
                  <div className="h-[180px] py-[40px] w-[260px] rounded-[30px] gap-10 bg-black-100">
                    <hr className="my-[5px]" />

                    <div className="px-[20px]">
                      <p className="text-lg  text-[#CCC] ">
                        {from.capital} International Airport, <br />
                        <span className="text-white">
                          {from.name.common.toUpperCase()}
                        </span>
                      </p>
                      <p className="text-[#797EF6]">
                        {fromDate != null ? fromDate.toDateString : ""}
                      </p>

                      <p className=" flex px-[20px] py-[5px] justify-end text-[#00FF00]">
                        {from.cca3}
                      </p>
                    </div>
                  </div>

                  <h1 className="text-xl text-gray-300 px-[10px] pd-[5px] pt-[50px] flex items-center">
                    DEPARTURE DATE:
                    <FaPlane className="mx-[10px] rotate-[270deg] text-[#00FF00]" />
                  </h1>

                  <DateTimePicker
                    calendarAriaLabel="Toggle calendar"
                    calendarIcon={
                      <AiOutlineCalendar className="text-[#CCC] hover:text-[#00FF00]" />
                    }
                    clearIcon={
                      <RiCloseCircleLine className="text-[#CCC] hover:text-[#FF0000]" />
                    }
                    onChange={setFromDate}
                    value={fromDate}
                    minDate={new Date()}
                    className={
                      "bg-gray-500  m-[10px] border-transparent rounded-[5px] text-gray-900 font-bold z-[200]"
                    }
                    calendarClassName={"bg-gray-300  my-calendar text-black"}
                    format="dd-MM-yyy hh:mm a"
                  />
                </section>
                <section>
                  <h1 className="text-3xl font-bold p-[10px]">To:</h1>
                  <Selector adj={from.name.common} setCur={setTo} data={to} />
                  <div className="h-[180px] py-[40px] w-[260px] rounded-[30px] bg-black-100">
                    <hr className="my-[5px]" />

                    <div className="px-[20px]">
                      <p className="text-lg  text-[#CCC] ">
                        {to.capital} International Airport, <br />
                        <span className="text-white">
                          {to.name.common.toUpperCase()}
                        </span>
                      </p>
                      <p className="flex px-[20px] py-[5px] justify-end  text-[#00FF00]">
                        {to.cca3}
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div className="flex gap-5">
              <button
                className="flex ml-[60px] w-fit my-[20px] justify-start py-[8px] px-[20px] bg-[#00FF00] text-[#03250d] text-2xl font-bold rounded-[30px] items-center border-[2px] border-[#0d2517]"
                onClick={handleGo}
              >
                Go..{" "}
                <span className="mx-[10px]">
                  <FaPlane />
                </span>
              </button>
              {reset ? (
                <button
                  className="flex mx-[6px] w-fit my-[20px] justify-start py-[8px] px-[20px] bg-[#797EF6] text-[#03250d] text-2xl font-bold rounded-[30px] items-center border-[2px] border-[#0d2517]"
                  onClick={handleChange}
                >
                  <span className="mx-[5px] font-bold">
                    <BiReset />
                  </span>{" "}
                  Reset
                </button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <MapChart from={from} to={to} />
        </section>
      </div>
      <AdminBody from={from} to={to} fromDate={fromDate.toDateString()} filter={filter} />
    </div>
  );
};

export default AdminHero;
