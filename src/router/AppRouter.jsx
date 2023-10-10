import React from "react";
import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRouter from "./PrivateRouter";
import MovieDetail from "../pages/MovieDetail";

const AppRouter = ({darkMode, toggleDarkMode}) => {
  return <>
           <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
           <Routes>
            <Route path="/" element={<Main darkMode={darkMode}/>}/>
            <Route path="/register" element={<Register  darkMode={darkMode}/>}/>
            <Route path="/login" element={<Login darkMode={darkMode}/>}/>
            <Route path="/details/:id" element={<PrivateRouter/>}>
              <Route path="" element={<MovieDetail darkMode={darkMode}/>} />   {/* Path bir üst satirda verildi */}
            </Route>
           </Routes>
          </>
          ;
};

export default AppRouter;
