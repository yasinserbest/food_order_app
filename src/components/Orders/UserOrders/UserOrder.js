import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import "./UserOrder.scss";
import { BsClockHistory } from "react-icons/bs";
const UserOrder = (props) => {
  return props.products.map((item) => (
    <div className="order__container" key={item.orderId}>
      <div className="order__story">
        <div className="order__story--date">
          <div className="order__story--key">Order Time</div>
          <div className="order__story--value">{item.orderDate}</div>
        </div>
        <div className="order__story--pieces">
          <div className="order__story--key">Order Pieces</div>
          <div className="order__story--value">{`${item.orderTotalQuantity} piece`}</div>
        </div>
        <div className="order__story--receiver">
          <div className="order__story--key">Order Receiver</div>
          <div className="order__story--value">{"Yasin Serbest"}</div>
        </div>
        <div className="order__story--total">
          <div className="order__story--key">Total</div>
          <div className="order__story--value">{`$ ${item.orderTotalPrice}`}</div>
        </div>
        <div className="order__story--btn">
          <Link
            to={`${item.orderId}`}
            className="order__story--btn-btnStory slight-shadow click"
          >
            Order Detail
          </Link>
        </div>
      </div>
      <div className="order__detail">
        <div className="order__detail--action">
          <div className="order__detail--key">{item.orderStatus}</div>
          <div className="order__detail--value">
            <BsClockHistory className="order__detail--value-clock" />
            {`Estimate Cook Time : 14 min`}
          </div>
        </div>
        {
          <div className="order__detail--images">
            {item.order.map((food) => (
              <img
                key={food.id}
                src={`images/${food.img}`}
                alt={`${food.img}`}
              />
            ))}
          </div>
        }

        <Link
          to={`feedback/${item.orderId}`}
          className="order__story--btn-btnFeedback slight-shadow click"
        >
          Give Feedback
        </Link>
      </div>
    </div>
  ));
};

export default UserOrder;
