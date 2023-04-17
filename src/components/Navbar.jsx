import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdBookmarks } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { styles } from "../styles";
// import { navLinks } from "../constants";
import { logo } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const uid=localStorage.getItem("userId");
  const aid=localStorage.getItem("userId");
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };



    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const handleLogout=(e)=>{
    e.preventDefault();
    localStorage.removeItem('userId');
    window.location.reload();
  }
  const handleMyBookings=(e)=>{
    e.preventDefault();
    navigate("/mybookings");
  }

  return (
    <nav
      className={`${styles.paddingX}  w-full flex  py-5 fixed top-0 z-[500] ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between  max-w-7xl ">
        <Link
          to={uid!=null?"/":"/admin"}
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            NJS &nbsp; | Book MyPlane
          </p>
        </Link>
      </div>

      <button onClick={handleMyBookings} className=" flex justify-center items-center  mx-[10px] bg-[#00FF00] px-[10px] rounded-[20px] text-black font-bold">
        Bookings
        <span className="mx-[2px] text-lg">
          <IoMdBookmarks />
        </span>
      </button>

      <button onClick={handleLogout} className=" flex justify-center items-center  border border-solid hover:border-[#00FF00] hover:text-[#00FF00] mx-[10px]  px-[15px] rounded-[20px] text-white text-sm ">
        Logout
        <span className="mx-[2px] text-lg">
          <BiLogOut />
        </span>
      </button>
    </nav>
  );
};

export default Navbar;
