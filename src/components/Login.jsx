import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { slideIn } from "../utils/motion";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import NavbarForm from "./NavbarForm";
import StarsCanvas from "./canvas/Stars";
import axios from "axios";
const Contact = (props) => {
  const formRef = useRef();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("Print");
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_APP_API_PATH}/api/auth/log`;
      const { data: res } = await axios.post(url, { ...form });
      //console.log(res);
      localStorage.removeItem("adminId");
      localStorage.setItem("userId", res.userId);
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
      //console.log(error.body.message);
    }
  };

  const handleLogAdmin = (e) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <div className="flex fex-row items-center justify-center p-[30px]">
      <NavbarForm />
      <div
        className={`h-fit mt-[70px] xl:w-[70vw] flex xl:flex-row flex-col-reverse xl:gap-10 gap-5  overflow-hidden `}
      >
        <div>
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className=" flex-[1] bg-black-100 p-8 rounded-2xl h-fit xl:w-[30vw] "
          >
            <p className={styles.sectionSubText}>Already Have an account?</p>
            <h3 className={styles.sectionHeadText}>Login.</h3>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col gap-8"
            >
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">Your email</span>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your mail id"
                  className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">
                  Your Password
                </span>
                <input
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                />
              </label>

              <button
                type="submit"
                className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </motion.div>
          <div className="flex flex-col mt-[10px] items-center  mb-[50px]">
            <button
              onClick={handleLogAdmin}
              className="my-[20px] bg-gray-600 px-[15px] py-[5px] rounded-[10px]"
            >
              Sign-In as Admin
            </button>
            <p>Create an Account?</p>
            <button
              onClick={handleSignUp}
              className="bg-tertiary py-3 px-[70px] rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary my-5"
            >
              Sign Up
            </button>
          </div>
        </div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-[1] xl:h-[70vh] xl:w-[45vw] md:h-[600px] h-[380px]  rounded-[700px]"
        >
          <EarthCanvas />
        </motion.div>
      </div>
      <StarsCanvas />
    </div>
  );
};

export default Contact;
