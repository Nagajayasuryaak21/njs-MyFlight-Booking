import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Login, Register} from "./components";
import Home from "./Home";
import Book from "./components/Book";
import MyBookings from "./components/MyBookings";
import AdminBody from "./components/AdminBody";
import AdminForm from "./components/AdminForm";
import AdminLogin from "./components/AdminLogin";
import AdminHero from "./components/AdminHero";
import AdminBookings from "./components/AdminBooking";
import { useState } from "react";
const App = () => {
  const userId = localStorage.getItem('userId');
  const adminId = localStorage.getItem('adminId');
  return (

    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={userId!=null ? <Home />:<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home  />} />
        <Route path="/book/:id" element={userId!=null ? <Book />:<Login/>} />
        <Route path="/mybookings" element={userId!=null ? <MyBookings />:<Login/>} />
        <Route path="/admin" element={adminId!=null ? <AdminHero/>:<AdminLogin/>} />
        <Route path="/form" element={adminId!=null ? <AdminForm/>:<AdminLogin/>} />
        <Route path="/form/:id" element={adminId!=null ? <AdminForm/>:<AdminLogin/>} />
        <Route path="/adminbookings/:id" element={adminId!=null ? <AdminBookings/>:<AdminLogin/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
