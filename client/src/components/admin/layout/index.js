import React, { Fragment } from "react";

import AdminNavber from "../partials/AdminNavber";
import AdminSidebar from "../partials/AdminSidebar";
import AdminFooter from "../partials/AdminFooter";

const AdminLayout = ({ children }) => {
  return (
    <Fragment>
      <AdminNavber />
      {/* Make it a column layout instead of a row */}
      <section className="flex flex-col bg-gray-100">
        {/* Sidebar will appear on top */}
        <AdminSidebar />

        {/* Main content */}
        <div className="w-full h-full">
          {children}
        </div>
      </section>
      <AdminFooter />
    </Fragment>
  );
};

export default AdminLayout;
