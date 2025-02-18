import React from "react";
import Header from "./_components/Header";

function DashboardLayout({ children }) {
  return (
    <div>
      <div className="bg-purple-200">
        <Header />
      </div>
      <div className="pt-10 px-10 md:px-20 lg:px-40 xl-px-60 bg-orange-50 min-h-screen">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
