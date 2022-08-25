import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineClear } from "react-icons/ai";
import { motion } from "framer-motion";
import CardItem from "./CardItem";
import { cardActions } from "../../store/card-slice";
import {
  orderActions,
  updateUserOrdersToDatabase,
} from "../../store/order-slice";

import "./Card.scss";

const Card = (props) => {
  const dispatch = useDispatch();

  const cardItems = useSelector((state) => state.card.items);

  const user = useSelector((state) => state.users.user);

  const { orders } = useSelector((state) => state.orders);

  const delivery = 3.99;

  const cardTotalPrice = useSelector((state) => state.card.cardTotalPrice);
  const cardTotalQuantity = useSelector((state) => state.card.totalQuantity);

  const [checkout, setcheckout] = useState(true);

  const changeButtonVisibility = () => {
    document.querySelector(".card__checkout--btn").disabled = true;
    setcheckout(false);
    setTimeout(() => setcheckout(true), 3000);
  };

  const clearButtonHandler = () => {
    dispatch(cardActions.clearCart());
  };

  const checkoutCardHandler = () => {
    changeButtonVisibility();
    setTimeout(() => props.onCartVisibility(), 3000);
    setTimeout(() => clearButtonHandler(), 3000);
    dispatch(
      orderActions.checkoutCard({
        cardItem: cardItems,
        totalPrice: (delivery + cardTotalPrice).toFixed(2),
        totalQuantity: cardTotalQuantity,
        user,
      })
    );
  };

  useEffect(() => {
    dispatch(
      updateUserOrdersToDatabase(user, orders, "Order received succesfully")
    );
  }, [orders]);

  const orderingContent = (
    <button className="card__checkout--btn click">
      <div>ORDERING</div>

      <motion.div
        initial={{}}
        animate={{
          y: [
            0,
            -1,
            -2,
            -3,
            -4,
            -5,
            -6,
            -7,
            -8,
            -9,
            -10,
            -9,
            -8,
            -7,
            -6,
            -5,
            -4,
            -3,
            -2,
            -1,
            0,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        .
      </motion.div>
      <motion.div
        initial={{ y: -1 }}
        animate={{
          y: [
            -2,
            -3,
            -4,
            -5,
            -6,
            -7,
            -8,
            -9,
            -10,
            -9,
            -8,
            -7,
            -6,
            -5,
            -4,
            -3,
            -2,
            -1,
            0,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        .
      </motion.div>
      <motion.div
        initial={{ y: -2 }}
        animate={{
          y: [
            -3,
            -4,
            -5,
            -6,
            -7,
            -8,
            -9,
            -10,
            -9,
            -8,
            -7,
            -6,
            -5,
            -4,
            -3,
            -2,
            -1,
            0,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        .
      </motion.div>
    </button>
  );
  const checkoutContent = (
    <button
      onClick={checkoutCardHandler}
      type="submit"
      className="card__checkout--btn click"
    >
      <div>CHECKOUT</div>
    </button>
  );

  const emptyCard = (
    <div className="emptyCard">
      <img src="images/empty-cartt.png" className="emptyCard__img" />
      <div className="emptyCard__title">Your Card is Empty</div>
      <div className="emptyCard__message">
        Please add item to card for continue to ordering..
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="card"
    >
      <div className="card__header">
        <BiArrowBack
          className="card__header--btn-back"
          onClick={props.onCartVisibility}
        />
        <span className="card__header-title">CART</span>
        <div
          onClick={clearButtonHandler}
          className="card__header--btn-clear medium-shadow click"
        >
          CLEAR
          <AiOutlineClear />
        </div>
      </div>
      {cardItems.length == 0 ? (
        emptyCard
      ) : (
        <>
          <div className="card__items">
            {cardItems.map((item) => (
              <CardItem
                key={item.id}
                item={{
                  id: item.id,
                  img: item.img,
                  name: item.name,
                  desc: item.desc,
                  optionalIngredients: item.optionalIngredients,
                  price: item.price,
                  piece: item.piece,
                }}
              />
            ))}
          </div>

          <div className="card__checkout">
            <div className="card__checkout--row">
              <span className="card__checkout--row-desc light">Sub Total</span>
              <span className="card__checkout--row-price light">
                $ {cardTotalPrice.toFixed(2)}
              </span>
            </div>
            <div className="card__checkout--row">
              <span className="card__checkout--row-desc light">Delivery </span>
              <span className="card__checkout--row-price light">
                $ {delivery}
              </span>
            </div>
            <hr />
            <div className="card__checkout--row">
              <span className="card__checkout--row-desc">Total</span>
              <span className="card__checkout--row-price">
                $ {(delivery + cardTotalPrice).toFixed(2)}
              </span>
            </div>
            {checkout ? checkoutContent : orderingContent}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Card;
