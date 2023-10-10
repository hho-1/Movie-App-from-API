import React from "react";
import AppRouter from "./router/AppRouter";
import AuthContextProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import MovieContextProvider from "./context/MovieContext";

const App = () => {

  const [darkMode, setDarkMode] = React.useState(true)

  function toggleDarkMode() {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <AuthContextProvider>
        <MovieContextProvider>
          <AppRouter darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
          <ToastContainer/>
        </MovieContextProvider>
        
      </AuthContextProvider>
      
    </div>
  );
};

export default App;
