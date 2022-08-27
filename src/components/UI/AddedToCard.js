import React, { useEffect } from "react";
import "./AddedToCard.scss";
import { useSelector, useDispatch } from "react-redux";
import { FaLocationArrow } from "react-icons/fa";
import { cardActions } from "../../store/card-slice";
import { motion, AnimatePresence } from "framer-motion";
const AddedToCard = () => {
  const { orderModalProduct } = useSelector((state) => state.products);

  const visible = useSelector((state) => state.card.addedCardVisible);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(cardActions.changeCardAdded()), 3000);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="addedItem"
        >
          <div className="addedItem__photo">
            <img src={`../../../../../images/${orderModalProduct.img}`} />
          </div>
          <div className="addedItem__details">
            <div className="addedItem__details--title">
              {orderModalProduct.name}
            </div>
            <div className="addedItem__details--desc">
              {orderModalProduct.desc}
            </div>
            <div className="addedItem__details--price">
              ${orderModalProduct.price}
            </div>
            <div className="addedItem__details--arrow">
              <FaLocationArrow />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddedToCard;
