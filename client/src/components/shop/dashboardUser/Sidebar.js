import React, { Fragment, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { logout } from "./Action";
import { DashboardUserContext } from "./Layout";

const Sidebar = (props) => {
  const { data } = useContext(DashboardUserContext);
  const history = useHistory();
  const location = useLocation();

  return (
    <Fragment>
      <div className="flex flex-col w-full space-y-4 md:w-3/12 font-medium">
        <div className="shadow hidden md:block w-full flex flex-col">
          <div
            onClick={() => history.push("/user/orders")}
            className={`${
              location.pathname === "/user/orders"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            } px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            Your Orders
          </div>
          <hr />
          <div
            onClick={() => history.push("/user/setting")}
            className={`${
              location.pathname === "/user/setting"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            } px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            Change Password
          </div>
          <hr />
          <div
            onClick={() => history.push("/user/profile")}
            className={`${
              location.pathname === "/user/profile"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            } px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            Account Details
          </div>
          <hr />
          <div
            onClick={() => logout()}
            className="px-4 py-4 hover:bg-gray-200 cursor-pointer"
          >
            Logout
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
