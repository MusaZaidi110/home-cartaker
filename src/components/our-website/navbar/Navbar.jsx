import React, { useState } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../../assets/Logo.png";
import Drawer from "@mui/material/Drawer";
import Button from "../../../elements/button/Button";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const navigateBook = () => {
    navigate("/request-service");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src={Logo} alt="Logo" />
        </div>

        {/* Desktop Menu */}
        <ul className="navbar-menu">
          <li>
            <NavLink
              exact="true"
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/join-as-vendor"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Join as Vendor
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>

        {/* Desktop Button */}
        <div className="navbar-button">
          <Button text={"Request Service"} onclick={navigateBook} />
        </div>

        {/* Hamburger Menu */}
        <div className="navbar-hamburger" onClick={toggleDrawer(true)}>
          <FontAwesomeIcon icon={faBars} />
        </div>

        {/* Drawer for Mobile */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          className="drawer"
        >
          <div
            className="drawer-content"
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <div className="drawer-close">
              <FontAwesomeIcon icon={faXmark} />
            </div>

            {/* Drawer Navigation Links */}
            <ul className="drawer-menu">
              <li>
                <NavLink
                  exact="true"
                  to="/"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/join-as-vendor"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Join as Vendor
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>

            {/* Drawer Button */}
            <Button text={"Request Service"} onclick={navigateBook} />
          </div>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
