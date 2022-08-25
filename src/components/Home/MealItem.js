import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdShoppingBasket } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import { motion } from "framer-motion";
import "./MealItem.scss";
import { productsActions } from "../../store/products-slice";
import { uiActions } from "../../store/ui-slice";
import PuffLoader from "react-spinners/PuffLoader";

const MealItem = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const user = useSelector((state) => state.users.user);

  const loading = useSelector((state) => state.products.loading);

  const openModalHandler = () => {
    if (user.id !== undefined) {
      props.openModal();
      dispatch(
        productsActions.setorderModalItem({
          id: props.id,
          items: products,
        })
      );
    } else {
      dispatch(
        uiActions.showNotification({
          title: "SIGN IN",
          message: "Please sign in before add item to cart",
          status: "signIn",
        })
      );
    }
  };

  let content;
  if (loading) {
    content = (
      <div className="loading">
        <PuffLoader loading={loading} color={"#11468F"} size={70} />;
      </div>
    );
  } else
    content = (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="item"
      >
        <div className="item__picture">
          <img src={`${props.img}`} alt={props.name} />
        </div>
        {props.show == false ? (
          " "
        ) : (
          <motion.span
            whileTap={{ fontSize: "40px", opacity: 0.1 }}
            className="item__add"
          >
            <MdShoppingBasket onClick={openModalHandler} />
          </motion.span>
        )}
        <div className="item__details">
          <div className="item__details--name">{props.name}</div>
          <div className="item__details--desc">{props.desc}</div>
          <div className="item__details--price">
            <BiDollar />
            {props.price}
          </div>
        </div>
      </motion.div>
    );

  return <>{content}</>;
};

export default MealItem;
