import React, { Fragment } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { LayoutGrid, PackageSearch, ClipboardList } from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <Fragment>
      <div
        style={{ boxShadow: "1px 1px 8px 0.2px #aaaaaa" }}
        className="w-full sticky top-0 z-10 bg-white text-gray-600 flex justify-around items-center py-4"
      >
        {/* Categories */}
        <div
          onClick={() => history.push("/admin/dashboard/categories")}
          className={`${
            location.pathname === "/admin/dashboard/categories"
              ? "border-b-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex-col items-center px-4 py-2`}
        >
          <LayoutGrid className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          <span className="text-sm">Categories</span>
        </div>

        {/* Organ */}
        <div
          onClick={() => history.push("/admin/dashboard/products")}
          className={`${
            location.pathname === "/admin/dashboard/products"
              ? "border-b-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex-col items-center px-4 py-2`}
        >
          <PackageSearch className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          <span className="text-sm">Organ</span>
        </div>

        {/* Request */}
        <div
          onClick={() => history.push("/admin/dashboard/orders")}
          className={`${
            location.pathname === "/admin/dashboard/orders"
              ? "border-b-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex-col items-center px-4 py-2`}
        >
          <ClipboardList className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          <span className="text-sm">Request</span>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminSidebar;
