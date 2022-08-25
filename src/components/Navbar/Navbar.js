import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.scss";
import UserAccount from "./UserAccount";
import Card from "../Card/Card";

function Navbar(props) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [active, setActive] = useState(false);
  const [cartVisibility, setCartVisibility] = useState(false);

  const toggleCartVisibility = () => {
    setCartVisibility((prevCart) => !prevCart);
  };
  const toggleActive = () => {
    setActive((prevActive) => !prevActive);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="images/logo.png" />
      </div>
      <ul className={`navbar__links ${active ? "active" : ""}`}>
        <li>
          <NavLink
            className={(navData) =>
              navData.isActive ? "activee navbar__link" : "navbar__link"
            }
            to="/"
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) =>
              navData.isActive ? "activee navbar__link" : "navbar__link"
            }
            to="/menu"
          >
            MENU
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) =>
              navData.isActive ? "activee navbar__link" : "navbar__link"
            }
            to="/aboutus"
          >
            ABOUT US
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) =>
              navData.isActive ? "activee navbar__link" : "navbar__link"
            }
            to="/contact"
          >
            CONTACT
          </NavLink>
        </li>
      </ul>
      <div
        className={`navbar__hamburger ${
          active ? "navbar__hamburger--active" : ""
        }`}
        onClick={toggleActive}
      >
        <span className="navbar__bar"></span>
        <span className="navbar__bar"></span>
        <span className="navbar__bar"></span>
      </div>

      {isLoggedIn ? (
        <UserAccount
          onChangeisInitial={props.onInitialChange}
          onCartVisibility={toggleCartVisibility}
        />
      ) : (
        <button
          onClick={props.onOpenLoginModal}
          className="navbar__login click"
        >
          LOGIN
        </button>
      )}
      {cartVisibility && <Card onCartVisibility={toggleCartVisibility} />}
    </nav>
  );
}

export default Navbar;
