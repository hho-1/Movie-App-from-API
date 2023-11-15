import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import avatar from "../assets/icons/avatar.png"
import { AuthContext } from "../context/AuthContext";
import DarkIcon from "../assets/icons/DarkIcon"
import LightIcon from "../assets/icons/LightIcon"
import { MovieContext } from "../context/MovieContext";


// npm install @headlessui/react @heroicons/react terminalde bu kodu girerek navbar ın hareketlenmesini sağlıyoruz

/* const currentUser = {displayName:"......"} */


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({darkMode, toggleDarkMode}) {

  const {currentUser, logout} = useContext(AuthContext)
  const {getirMovie} = useContext(MovieContext)
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const FULL_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

  const handleClickForMainPage = () => {
    getirMovie(FULL_API)    
  }

  return (
    <>
      <Disclosure as="nav" className={`navb ${darkMode ? "dark" : ""} shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out`}>
      
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <Link to="/" onClick={handleClickForMainPage}>React Movie App</Link>
              
              <div className="absolute inset-y-0 right-0 flex items-center ">
                <button type="button"
                  className={`themeButton ${darkMode ? "dark" : ""} me-9 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black dark:text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
                  onClick={toggleDarkMode}>{darkMode ? <LightIcon/> : <DarkIcon className="darkIcon"/>}
                </button>
                {currentUser && (<h5>{currentUser.displayName}</h5>)}
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={currentUser?.photoURL || avatar}
                        referrerPolicy="no-referrer"   //google ile baglanmada hata almamak icin
                        alt="avatar"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {
                        !currentUser ? (
                          <><Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/register"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Register
                            </Link>
                          )}
                        </Menu.Item><Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/login"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Login
                              </Link>
                            )}
                          </Menu.Item></>
                        ) 
                        : 
                        (<Menu.Item>
                        {({ active }) => (
                          <span 
                            onClick={() => logout()}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                          >
                            Logout
                          </span>
                        )}
                      </Menu.Item>)
                      }
                                   
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

      
     
      </Disclosure>
      <div className="h-[55px]"></div>         {/* Navbar register/login sayfasinin üstüne geldigi icin asagi kaydirmak icin bunu yaptik */}
    </>
  );
}
