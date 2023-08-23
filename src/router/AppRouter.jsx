import React from "react";
import Navbar from "../components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Register from "../pages/Register";
import Login from "../pages/Login";

const AppRouter = () => {
  return <BrowserRouter>
           <Navbar/>
           <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
           </Routes>

          </BrowserRouter>;
};

export default AppRouter;
