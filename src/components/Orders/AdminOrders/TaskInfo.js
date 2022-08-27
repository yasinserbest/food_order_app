import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import cloneDeep from "lodash.clonedeep";

import "./TaskInfo.scss";
import { updateOneOrderDatabase } from "../../../store/order-slice";
import { uiActions } from "../../../store/ui-slice";

const TaskInfo = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const { orderId } = params;

  const allOrders = useSelector((state) => state.orders.orders);

  let orderIndex = "";

  let taskOrder = allOrders.filter((order, i) => {
    if (order.orderId == orderId) {
      orderIndex = i;
    }
    return order.orderId == orderId;
  });

  const updateOneOrderHandler = () => {
    const newTaskOrder = cloneDeep(taskOrder[0]);
    newTaskOrder.orderStatus = document.querySelector(
      ".taskInfo__order--buttons-status"
    ).value;
    dispatch(
      updateOneOrderDatabase(
        orderIndex,
        taskOrder[0].user.id,
        newTaskOrder,
        "Order status updated successfully!"
      )
    );
  };

  return (
    <>
      {taskOrder.length !== 0 ? (
        <section className="taskInfo">
          <div className="taskInfo__title heading--tertiary ">Task Info</div>
          <div className="taskInfo__receiver">
            <div className="taskInfo__receiver--item">
              <div>
                <div className="taskInfo__receiver--item-key">
                  Preparing Time
                </div>
                <div className="taskInfo__receiver--item-value">
                  {taskOrder[0].orderDate}
                </div>
              </div>
            </div>
            <div className="taskInfo__receiver--item">
              <div>
                <div className="taskInfo__receiver--item-key">Address</div>
                <div className="taskInfo__receiver--item-value">
                  {taskOrder[0].user.adress}
                </div>
              </div>
            </div>
            <div className="taskInfo__receiver--item">
              <div>
                <div className="taskInfo__receiver--item-key">
                  {taskOrder[0].user.name}
                </div>
                <div className="taskInfo__receiver--item-value">
                  {taskOrder[0].user.phone}
                </div>
              </div>
            </div>
          </div>
          {taskOrder[0].orderFeedback && (
            <div className="taskInfo__feedback">
              <span className="taskInfo__feedback--title">
                Receiver Feedback:{" "}
              </span>
              {taskOrder[0].orderFeedback}
            </div>
          )}
          <div className="taskInfo__order">
            <div className="taskInfo__items">
              {taskOrder[0].order.map((item) => (
                <div key={item.id} className="taskInfo__item">
                  <div className="taskInfo__item--img">
                    <img
                      src={`../../../../../images/${item.img}`}
                      alt=""
                      className=""
                    />
                    <div className="">{item.name}</div>
                  </div>
                  <div className="taskInfo__item--piece">x {item.piece}</div>
                  {item.removedIngredients ? (
                    <div className="taskInfo__item--ingredients">
                      without {item.removedIngredients?.join(" , ")}
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="taskInfo__item--price">${item.price}</div>
                </div>
              ))}
            </div>
            <div className="taskInfo__order--total">
              ${taskOrder[0].orderTotalPrice}
            </div>
            <div>{taskOrder[0].orderStatus}</div>
            <div className="taskInfo__order--buttons">
              <button
                onClick={updateOneOrderHandler}
                className="taskInfo__order--buttons-save click"
              >
                SAVE
              </button>
              <select
                defaultValue={taskOrder[0].orderStatus}
                className="taskInfo__order--buttons-status click"
              >
                <option value="Order Received">Order Received</option>
                <option value="Order Preparing">Order Preparing</option>
                <option value="Order Cooking">Order Cooking</option>
                <option value="Order Done">Order Done</option>
              </select>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default TaskInfo;
