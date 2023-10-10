import React, { useContext, useState } from "react";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = ({darkMode}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {signIn, signUpGoogle, forgotPassword} = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    signIn(email, password)
  
  }

  return (
  <div className={`overflow-hidden flex-1 h-screen justify-center items-center loginPage ${darkMode ? "dark" : ""}`}>
      <div
        className={`form-container mt-[5vh] w-[380px] h-[580px]`}
      >
        <form onSubmit={handleSubmit} className={`loginForm ${darkMode ? "dark" : ""}`}>
          <h2 className="text-red-main text-2xl font-[500] text-center tracking-[0.1em] mb-3">
            Sign In
          </h2>
          
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="floating_email"
              type="email"
              className="peer"
              placeholder=" "
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floating_email">Email</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="floating_password"
              type="password"
              className="peer"
              placeholder=" "
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floating_password">Password</label>
          </div>
          <div className="flex justify-between">
            <span
              onClick={()=>forgotPassword(email)}
              className="py-3 font-[0.75em] cursor-pointer decoration-none text-gray-500 hover:text-[#ff4b45]"
            >
              Forgot Password
            </span>
            <Link
              className="py-3 font-[0.75em] cursor-pointer decoration-none text-gray-500 hover:text-[#ff4b45]"
              to="/register"
            >
              Sign Up
            </Link>
          </div>
          <button type="submit" className="btn-danger">Login</button>
          <button type="button" className="btn-danger flex justify-between text-center" onClick={()=>signUpGoogle()}>
            Continue with Google
            <GoogleIcon color="currentColor" />
          </button>
        </form>
      </div>
    </div>
    )
};

export default Login;
