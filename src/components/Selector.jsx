import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import data from "../constants/countries.json";
const Selector = (props) => {
  const [countries, setCountries] = useState(data);
  const [inputValue, setInputValue] = useState("");
  //const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   fetch("https://restcountries.com/v2/all?fields=name,latlng")
  //     .then((res) => res.json())
  //     .then((Data) => {
  //       setCountries(Data);
  //       console.log(Data);
  //       data =Data;
  //     });
  // }, []);
  //console.log(data);
  return (
    
    <div className="absolute ml-[5px] mt-[8px] w-72 font-medium h-fit z-[100] ">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-transparent text-white text-lg font-bold px-[15px] w-full p-2 flex items-center justify-between rounded ${
          !props.data.name.common && "text-gray-700"
        }`}
      >
        {props.data.name.common
          ? props.data.name.common?.length > 25
            ? props.data.name.common?.substring(0, 25) + "..."
            : props.data.name.common
          : "Select Country"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white text-black">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter country name"
            className="text-gray-700 bg-white p-2 outline-none"
          />
        </div>
        {countries?.map((country) => {
          if (country?.name.common != props.adj) {
            return (
              <li
                key={country?.name.common}
                className={`p-2 text-sm hover:bg-sky-600 hover:text-white text-black
                    ${
                      country?.name?.common.toLowerCase() ===
                        props.data.name.common?.toLowerCase() && "bg-sky-600 text-white"
                    }
                    ${
                      country?.name?.common.toLowerCase().startsWith(inputValue)
                        ? "block"
                        : "hidden"
                    }`}
                onClick={() => {
                  if (country?.name?.common.toLowerCase() !== props.data.name.common.toLowerCase()) {
                    //setSelected(country?.name.common);
                    setOpen(false);
                    setInputValue("");
                    props.setCur(country);
                  }
                }}
              >
                {country?.name.common}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Selector;
