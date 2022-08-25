import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cardActions } from "../../store/card-slice";
import { motion, AnimatePresence } from "framer-motion";
import "./OrderModal.scss";

const OrderModal = (props) => {
  const dispatch = useDispatch();

  const [piece, setPiece] = useState(1);

  const orderModalProduct = useSelector(
    (state) => state.products.orderModalProduct
  );

  const optionalIngredients = orderModalProduct?.optionalIngredients?.split(
    ","
  );

  const pieceChangeHandler = (e) => {
    setPiece(+e.target.value);
  };

  const removeIngredients = () => {
    let removeIngredient = [];
    const ingredient = document.getElementsByName("ingredient");
    for (let i = 0; i < ingredient.length; i++) {
      if (ingredient[i].checked == true) {
        removeIngredient.push(ingredient[i].value);
      }
    }
    return removeIngredient;
  };
  const addIngredients = () => {
    let addIngredient = [];
    const ingredient = document.getElementsByName("ingredient");
    for (let i = 0; i < ingredient.length; i++) {
      if (ingredient[i].checked == false) {
        addIngredient.push(ingredient[i].value);
      }
    }
    return addIngredient;
  };

  const addToCardHandler = () => {
    const removeIngredient = removeIngredients();
    const addIngredient = addIngredients();

    dispatch(
      cardActions.addItemToCart({
        id: orderModalProduct.id,
        img: orderModalProduct.img,
        name: orderModalProduct.name,
        desc: orderModalProduct.desc,
        price: orderModalProduct.price,
        piece: piece,
        removedIngredients: removeIngredient,
        addedIngredients: addIngredient,
      })
    );
  };

  return (
    <div className="order__modal--backdrop">
      <AnimatePresence>
        {props.orderModal && (
          <motion.div
            initial={{ y: -40 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            className="order__modal"
          >
            <div className="order__modal--close" onClick={props.onCloseModal}>
              X
            </div>
            <div className="order__modal--item">
              <img src={`images/${orderModalProduct.img}`} alt="" />
              <div className="order__modal--item--desc">
                <div className="order__modal--item--desc-name">
                  {orderModalProduct.name}
                </div>
                <div className="order__modal--item--desc-detail">
                  {orderModalProduct.desc}
                </div>
              </div>
            </div>
            <div className="order__modal--item-details">
              <select
                onChange={pieceChangeHandler}
                className="order__modal--item-details-piece"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <span className="order__modal--item-details-price">
                $ {orderModalProduct.price}
              </span>
            </div>
            {optionalIngredients.includes("") ? (
              ""
            ) : (
              <div className="order__modal--item-ingredients">
                <div className="order__modal--item-ingredients-title">
                  Please choose which products you want to remove
                </div>
                {optionalIngredients.map((item) => (
                  <React.Fragment key={item}>
                    <input
                      type="checkbox"
                      id={item}
                      className="order__modal--item-ingredients-input"
                      name="ingredient"
                      value={item}
                    />
                    <label
                      className="order__modal--item-ingredients-label"
                      htmlFor={item}
                    >
                      {item}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            )}
            <button
              onClick={() => {
                addToCardHandler();
                props.onCloseModal();
              }}
              className="order__modal--btn click"
            >
              ADD TO CART
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderModal;
