import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlane } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Selector from "./Selector";
import axios from "axios";
import { RiCloseCircleLine } from "react-icons/ri";
import { Canvas } from "@react-three/fiber";
import CanvasLoader from "./Loader";
import NavbarForm from "./NavbarForm";
const AdminForm = (params) => {
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
    capital: "",
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
    capital: "",
  });
  const [fromDate, setFromDate] = useState(new Date());
  const [filter, setFilter] = useState(false);
  const [reset, setReset] = useState(false);
  const formRef = useRef();
  const [form, setForm] = useState({
    flightName: "",
    flightId: "",
    image: "",
    fromTime: "",
    toTime: "",
    time: "",
    price: "",
    seats: 60,
  });

  const [loading, setLoading] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setisLoading(true);
      fetch(`${import.meta.env.VITE_APP_API_PATH}/api/air/get/id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      })
        .then((response) => response.json())
        .then((newData) => {
          //console.log(newData);
          const setFprm = {
            flightName: newData.flightName,
            flightId: newData.flightId,
            image: newData.image,
            fromTime: newData.fromTime,
            toTime: newData.toTime,
            time: newData.time,
            price: newData.price,
            seats: newData.seats,
          };
          setForm(setFprm);
          setTo({
            name: {
              common: newData.toPlace,
              official: "",
              nativeName: {
                fra: { official: "", common: "" },
              },
            },
            latlng: [],
            country: "",
            cca3: "",
            capital: "",
          });
          setFrom({
            name: {
              common: newData.fromPlace,
              official: "",
              nativeName: {
                fra: { official: "", common: "" },
              },
            },
            latlng: [],
            country: "",
            cca3: "",
            capital: "",
          });

          setFromDate(new Date(newData.fromDate));

          // setData(newData.data[0]);
          // if (newData.myBooking != null) {
          //   setInput(newData.myBooking.seats);
          // }
          setisLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      //setData(datas);
      setisLoading(false);
      // navigate("/");
    }
  }, [id]);

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("Print");
    setLoading(true);
    //console.log(form);
    if (from.name.common == "" || to.name.common == "") {
      alert("Select From and To Country Properly");
      setLoading(false);
      return;
    } else {
      const data = {
        ...form,
        fromPlace: from.name.common,
        toPlace: to.name.common,
        fromAirport: from.capital + " International Alrport",
        toAirport: to.capital + " International Alrport",
        fromDate: fromDate.toString(),
      };
      //console.log(data);
      if (id != null) {
        try {
          const url = `${import.meta.env.VITE_APP_API_PATH}/api/air/put/id`;
          const { data: res } = await axios.post(url, { ...data,_id:id });
          //console.log(res);
          alert(res.message);
          navigate("/admin");
          // localStorage.setItem("userId", res.userId);
          // window.location.reload();
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
          //console.log(error.body.message);
        }
      } else {
        try {
          const url = `${import.meta.env.VITE_APP_API_PATH}/api/air/put`;
          const { data: res } = await axios.post(url, { ...data });
          //console.log(res);
          alert(res.message);
          navigate("/admin");
          // localStorage.setItem("userId", res.userId);
          // window.location.reload();
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
          //console.log(error.body.message);
        }
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
    <div className="flex fex-row items-center justify-center p-[30px]  w-full">
      <NavbarForm />
      <div
        className={`h-fit mt-[70px] w-[90%] xl:w-[60%]  flex  flex-col-reverse xl:gap-10 gap-5  overflow-hidden `}
      >
        <div>
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className=" flex-[1] bg-black-100 p-8 rounded-2xl h-fit  "
          >
            <p className={styles.sectionSubText}>Add flight details</p>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col gap-8"
            >
              <div className="flex g-10">
                <label className="flex flex-col w-[55%]">
                  <span className="text-white font-medium mb-4">
                    Flight Name
                  </span>
                  <input
                    type="text"
                    value={form.flightName}
                    name="flightName"
                    onChange={handleChange}
                    required
                    placeholder="Enter The Flight Name"
                    className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                  />
                </label>
                <label className="flex flex-col ml-[30px]">
                  <span className="text-white font-medium mb-4">Flight ID</span>
                  <input
                    type="text"
                    required
                    value={form.flightId}
                    name="flightId"
                    onChange={handleChange}
                    placeholder="Enter The Flight Id"
                    className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                  />
                </label>
              </div>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">
                  Flight Image URL
                </span>
                <input
                  type="text"
                  required
                  value={form.image}
                  name="image"
                  onChange={handleChange}
                  placeholder="Enter image url"
                  className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                />
              </label>

              <div className=" w-[100%]  flex gap-10">
                <section>
                  <h1 className="text-3xl font-bold px-[20px] py-[10px]">
                    From :
                  </h1>
                  <Selector adj={to.name.common} setCur={setFrom} data={from} />
                  <div className="h-[180px] py-[40px] w-[260px] rounded-[30px] gap-10 bg-gray-600">
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
                  <div className="h-[180px] py-[40px] w-[260px] rounded-[30px] bg-gray-600">
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

              <div className="flex ">
                <label className="flex flex-col">
                  <span className="text-white font-medium mb-4">
                    Start Time:
                  </span>
                  <input
                    type="text"
                    required
                    value={form.fromTime}
                    name="fromTime"
                    onChange={handleChange}
                    placeholder="Enter start time"
                    className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                  />
                </label>
                <label className="flex flex-col ml-[30px]">
                  <span className="text-white font-medium mb-4">End Time:</span>
                  <input
                    type="text"
                    required
                    value={form.toTime}
                    name="toTime"
                    onChange={handleChange}
                    placeholder="Enter end time"
                    className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                  />
                </label>
              </div>

              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">
                  Average Time
                </span>
                <input
                  type="text"
                  required
                  value={form.time}
                  name="time"
                  onChange={handleChange}
                  placeholder="Enter average time taken"
                  className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">
                  Price / Head
                </span>
                <input
                  type="text"
                  required
                  value={form.price}
                  name="price"
                  onChange={handleChange}
                  placeholder="Price Per Head"
                  className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">Seats</span>
                <input
                  type="text"
                  required
                  value={form.seats}
                  name="seats"
                  onChange={handleChange}
                  placeholder="Price Per Head"
                  className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium w-[100px]"
                />
              </label>

              <button
                type="submit"
                className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary mx-auto"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
