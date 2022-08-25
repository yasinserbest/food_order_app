import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { MdShoppingBasket, MdAdd } from "react-icons/md";
import { motion } from "framer-motion";
import { authActions } from "../../store/auth-slice";
import { userActions } from "../../store/user-slice";
import { orderActions } from "../../store/order-slice";

import "./UserAccount.scss";
const UserAccount = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.auth.email);
  const cardQuantity = useSelector((state) => state.card.totalQuantity);
  const [open, setOpen] = useState(false);

  const logoutHandlerr = (e) => {
    e.preventDefault();
    dispatch(authActions.logoutHandler());
    dispatch(userActions.deleteUser());
    dispatch(orderActions.deleteOrders());
    localStorage.removeItem("allOrders");
    navigate("/");
    props.onChangeisInitial();
  };

  return (
    <div className="user">
      <motion.div
        whileTap={{ scale: 0.6 }}
        className="user__card"
        onClick={props.onCartVisibility}
      >
        <MdShoppingBasket className="user__card--icon" />
        <span className="user__card--number">{cardQuantity}</span>
      </motion.div>
      <motion.img
        whileTap={{ scale: 0.6 }}
        src="images/user.png"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <ul className="user__links">
          {email == "admin@gmail.com" && (
            <>
              <li>
                <NavLink className="user__link" to="/products/addProduct">
                  New Item <MdAdd className="ml-xs" />
                </NavLink>
              </li>

              <li>
                <NavLink className="user__link" to="/adminOrders">
                  Admin Orders <MdShoppingBasket className="ml-xs" />
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink className="user__link" to="/userOrders">
              Orders <MdShoppingBasket className="ml-xs" />
            </NavLink>
          </li>
          <li onClick={logoutHandlerr}>
            <span className="user__link">
              Logout <MdShoppingBasket className="ml-xs" />
            </span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserAccount;
