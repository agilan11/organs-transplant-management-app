import React, { Fragment, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FiSettings } from 'react-icons/fi';
import "./style.css";

import { logout } from "./Action";
import { LayoutContext } from "../index";
import { isAdmin } from "../auth/fetchApi";

const Navber = (props) => {
  const history = useHistory();
  const location = useLocation();

  const { data, dispatch } = useContext(LayoutContext);


  const navberToggleOpen = () =>
    data.navberHamburger
      ? dispatch({ type: "hamburgerToggle", payload: false })
      : dispatch({ type: "hamburgerToggle", payload: true });

  const loginModalOpen = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const cartModalOpen = () =>
    data.cartModal
      ? dispatch({ type: "cartModalToggle", payload: false })
      : dispatch({ type: "cartModalToggle", payload: true });
  
  const isAdmin = () => {
  if (typeof window === "undefined") return false;

  const jwt = localStorage.getItem("jwt");
  if (!jwt) return false;

  try {
    const data = JSON.parse(jwt);
    return data.user && data.user.role === 1;
  } catch (err) {
    return false;
  }
};


  return (
    <Fragment>
      {/* Navber Section */}
      <nav className="fixed top-0 w-full z-20 shadow-lg lg:shadow-none bg-black">
        <div className="m-4 md:mx-12 md:my-6 grid grid-cols-2 lg:grid-cols-2">
            {/* 

          <div className="hidden lg:block col-span-1 flex text-gray-600 mt-1">
            <span
              className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer"
              onClick={(e) => history.push("/")}
            >
              View Organs
            </span>
            
          </div>
          */}
          <div className="col-span-2 lg:hidden flex justify-items-stretch	 items-left">
            <svg
              onClick={(e) => navberToggleOpen()}
              className="col-span-1 lg:hidden w-8 h-8 cursor-pointer text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span
              onClick={(e) => history.push("/")}
              style={{ letterSpacing: "0.10rem" }}
              className="flex items-left text-left font-bold text-white text-2xl cursor-pointer px-2 text-left"
            >
              OrgaNova
            </span>
          </div>
          <div className="hidden lg:flex flex-col items-left col-span-1 text-left text-white">
  <div
    onClick={(e) => history.push("/")}
    className="font-bold text-2xl cursor-pointer tracking-normal"
  >
    OrgaNova
  </div>
  <span className="text-white text-xl">Streamlining organ transplant management and coordination.</span>
</div>


          <div className="flex items-right col-span-2 lg:col-span-1 flex justify-end">
            {/*  WishList Page Button */}
            <div>
              
            </div>
            {localStorage.getItem("jwt") ? (
              <Fragment>
                <div
                  className="userDropdownBtn  px-2 py-2 rounded-lg relative"
                  title="Logout"
                >
                  <button className="bg-transparent text-white p-2 rounded hover:bg-white hover:text-black transition">
      <FiSettings className="w-8 h-8 mb-4" />
    </button>
                  
                  {/* 
                  <svg
                    className="cursor-pointer w-8 h-8 text-gray-600 hover:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  */}
                  <div className="userDropdown absolute right-0 mt-1 bg-gray-200 rounded">
                    {!isAdmin() ? (
                      <Fragment>
                        <li className="flex flex-col text-gray-700 w-48 shadow-lg">
                          <span
                            onClick={(e) => history.push("/user/orders")}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>View Orders</span>
                          </span>

                          
                          <span
                            onClick={(e) => logout()}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>Logout</span>
                          </span>
                        </li>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <li className="flex flex-col text-gray-700 w-48 shadow-lg">
                          <span
                            onClick={(e) => history.push("/admin/dashboard/categories")}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </span>
                            <span>Admin Panel</span>
                          </span>
                          <span
                            onClick={(e) => logout()}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                              </svg>
                            </span>
                            <span>Logout</span>
                          </span>
                        </li>
                      </Fragment>
                    )}
                  </div>
                </div>
              </Fragment>
            ) : (
              /* Login Modal Button */
              <div
                onClick={(e) => loginModalOpen()}
                className="cursor-pointer hover:bg-white-100 px-2 py-2 rounded-lg"
                title="Login"
              >
                <button className="text-black bg-white px-4 py-2 rounded hover:bg-gray-100 border border-gray-300 transition">
                  Login
                </button>

                {/* 
                <svg
                  className="w-8 h-8 text-gray-600 hover:text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                */}
              </div>
            )}
            {/* Cart Modal Button */}
            <div
              onClick={(e) => cartModalOpen()}
              className="hover:bg-white-200 px-2 py-2 rounded-lg relative cursor-pointer"
              title="Organs"
            >
              <button className="text-black bg-white  px-4 py-2 rounded hover:bg-gray-100 border border-gray-300 transition">
  Cart
</button>

            
            {/* 
            <svg
  class="w-8 h-8 text-black hover:text-green-700"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M12 3V1M8 4v3H4v12a2 2 0 002 2h12a2 2 0 002-2V7h-4V4h-4zm4 0h-2V1h2v3z"
  />
  <path
    fill="currentColor"
    d="M12 15.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
  />
  <path
    fill="currentColor"
    d="M16.5 12a4.5 4.5 0 00-3.5-4.4v1.9a2.5 2.5 0 015 0v-.5M12 9V6.5M15 9V6.5M9 9V6.5M6 12h12M7 15h10a2 2 0 002-2v-1.5M12 15.5v-3"
  />
</svg>
*/}



              <span className="absolute top-0 -ml-2 mt-1 bg-green-700 rounded px-1 text-white text-xs hover:text-gray-200 font-semibold">
                {data.cartProduct !== null ? data.cartProduct.length : 0}
              </span>
            </div>
          </div>
        </div>
        <div
          className={
            data.navberHamburger && data.navberHamburger
              ? "px-1 pb-2 md:pb-0 md:px-10 lg:hidden"
              : "hidden px-1 pb-2 md:pb-0 md:px-10 lg:hidden"
          }
        >
          <div className="col-span-1 flex flex-col text-gray-600">
            <span
              className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
              onClick={(e) => history.push("/")}
            >
              View Organs
            </span>
            <span
              className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
              onClick={(e) => history.push("/contact-us")}
            >
              Contact us
            </span>
          </div>
        </div>
      </nav>
      {/* End Navber Section */}
    </Fragment>
  );
};

export default Navber;
