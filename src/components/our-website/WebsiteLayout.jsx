import React from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";

const WebsiteLayout = () => {
  return (
    <React.Fragment>
        <Navbar />
            <Outlet />
        <Footer />
    </React.Fragment>
  );
};

export default WebsiteLayout;
