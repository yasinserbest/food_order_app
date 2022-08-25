import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiMinus, BiPlus } from "react-icons/bi";
import { cardActions } from "../../store/card-slice";
import { productsActions } from "../../store/products-slice";
import { motion } from "framer-motion";

import "./CardItem.scss";
const CardItem = (props) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.items);

  const removeItemHandler = () => {
    dispatch(cardActions.removeItemFromCart(props.item.id));
  };
  const addItemHandler = () => {
    console.log(props.item.id, products);
    dispatch(
      productsActions.setorderModalItem({
        id: props.item.id,
        items: products,
      })
    );
    dispatch(
      cardActions.addItemToCart({
        id: props.item.id,
        img: props.item.img,
        name: props.item.name,
        desc: props.item.desc,
        price: props.item.price,
        piece: 1,
        optionalIngredients: props.item.optionalIngredients,
      })
    );
  };
  const removeItemFromCard = () => {
    dispatch(cardActions.removeAllItemFromCart(props.item.id));
  };

  return (
    <div className="card__item">
      <div className="card__item--pic">
        <img src={`images/${props.item.img}`} alt="" />
      </div>
      <div className="card__item--detail">
        <div className="card__item--detail-name">{props.item.name}</div>
        <div className="card__item--detail-price">{`$${props.item.price}`}</div>
      </div>
      <div className="card__item--piece">
        <BiMinus
          onClick={removeItemHandler}
          className="card__item--piece-minus slight-shadow"
        />
        <span className="card__item--piece-piece">{props.item.piece}</span>
        <BiPlus
          onClick={addItemHandler}
          className="card__item--piece-plus slight-shadow"
        />
      </div>
      <span onClick={removeItemFromCard} className="card__item--delete">
        X
      </span>
    </div>
  );
};

export default CardItem;
