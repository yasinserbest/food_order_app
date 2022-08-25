import React from "react";
import { NavLink } from "react-router-dom";
import { FaPizzaSlice } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="bg-video">
        <video className="bg-video__content" autoPlay muted loop>
          <source src="images/video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="header__desc">
        <div className="heading--primary">
          We don't cook, we create your{" "}
          <span className="header__span">emotions</span>
        </div>
        <div className="heading--secondary">
          Best restaurant in our town. Own speciliaties!
        </div>
        <div className="header__desc--buttons">
          <NavLink to="/" className="header__desc--button">
            <span className="header__desc--button-icon">
              <FaPizzaSlice />
            </span>
            <span className="header__desc--button-text">ORDER NOW!</span>
          </NavLink>
          <NavLink to="/" className="header__desc--button">
            <span className="header__desc--button-icon">
              <MdRestaurantMenu />
            </span>
            <span className="header__desc--button-text">MENU</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
/*
                <div class="row">
                    <div class="story">
                        <figure class="story__shape">
                           <img src="img/nat-8.jpg" alt="person on a tour" class="story__img">
                            <figcaption class="story__caption">Mary Smith</figcaption>
                        </figure>
                        <div class="story__text">
                            <h3 class="heading-tertiary u-margin-bottom-small">i had best week ever with my family</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod officiis placeat eveniet dolor harum corporis veritatis asperiores assumenda veniam magni.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod officiis placeat eveniet dolor harum corporis veritatis.
                            </p>
                        </div>
                    </div>
                </div>
*/
