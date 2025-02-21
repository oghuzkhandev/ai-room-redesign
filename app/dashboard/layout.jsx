import React from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer"

function DashboardLayout({ children }) {
  return (
    <div>
      <div className="bg-slate-200">
        <Header />
      </div>
      <div className="pt-10 px-10 md:px-20 lg:px-40 xl-px-60 bg-orange-50 min-h-screen mt-1">
        {children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout;
