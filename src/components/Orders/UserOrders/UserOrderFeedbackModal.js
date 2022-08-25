import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";
import "./UserOrderFeedbackModal.scss";
import { updateOneOrderDatabase } from "../../../store/order-slice";
import cloneDeep from "lodash.clonedeep";

const FeedbackModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { orderId } = params;

  const { user } = useSelector((state) => state.users);

  const { orders } = useSelector((state) => state.orders);

  const [feedback, setFeedback] = useState("");

  const feedbackChangeHandler = (e) => {
    setFeedback(e.target.value);
  };

  let orderIndex = "";

  let feedbackOrder = orders.filter((order, i) => {
    if (order.orderId == orderId) {
      orderIndex = i;
    }
    return order.orderId == orderId;
  });

  const addFeedback = (e) => {
    e.preventDefault();
    const newfeedbackOrder = cloneDeep(feedbackOrder[0]);
    newfeedbackOrder.orderFeedback = feedback;
    dispatch(
      updateOneOrderDatabase(
        orderIndex,
        user.id,
        newfeedbackOrder,
        "Feedback added to your order."
      )
    );
    closeDetailModal();
  };

  const closeDetailModal = () => {
    navigate("/userOrders");
  };
  return (
    <div className="feedback__backdrop">
      <div className="feedback__modal">
        <div className="feedback__modal--close" onClick={closeDetailModal}>
          X
        </div>
        <form onSubmit={addFeedback} className="feedback__wrapper">
          <div className="feedback__title">
            Write any feedback to us about your {orderId} ID number order.
          </div>
          <textarea
            onChange={feedbackChangeHandler}
            type="text"
            placeholder="Write your thoughts about your order here..."
            className="feedback__textarea slight-shadow"
          ></textarea>
          <div className="feedback__buttons">
            <div
              className="feedback__buttons-btn feedback__buttons-btnClose  click"
              onClick={closeDetailModal}
            >
              CLOSE
            </div>
            <button className="feedback__buttons-btn click">SEND</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
