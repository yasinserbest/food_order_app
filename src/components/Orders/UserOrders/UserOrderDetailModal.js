import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "./UserOrderDetailModal.scss";
import {
  orderActions,
  updateUserOrdersToDatabase,
} from "../../../store/order-slice";
import { uiActions } from "../../../store/ui-slice";

let isInitial = true;
const OrderDetailModal = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orderId } = params;
  const { orders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.users);

  const order = orders.filter((item) => item.orderId == orderId);

  const [orderTotalPrice, setOrderTotalPrice] = useState(
    order[0].orderTotalPrice
  );

  let beforeChangePiece;
  let afterChangePiece;
  const quantityChangeHandler = (e, itemId) => {
    const product = order[0].order.find((product) => product.id == itemId);
    let newTotalPrice = orderTotalPrice - product.price * beforeChangePiece;
    let afterChangePiece = e.target.value;
    newTotalPrice += afterChangePiece * product.price;
    setOrderTotalPrice(newTotalPrice.toFixed(2));
  };

  const closeDetailModal = () => {
    isInitial = true;
    navigate("/userOrders");
  };

  const modifyOrderHandler = (e) => {
    let pieceArray = [];
    const ordersPiece = document.querySelectorAll(
      ".orderDetail__modal--item-detail-piece"
    );
    Array.from(ordersPiece).map((order) => pieceArray.push(order.value));
    dispatch(
      orderActions.modifyOrder({
        newPieces: pieceArray,
        orderId,
      })
    );
  };
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    } else {
      console.log(order);
      if (
        order[0].orderStatus == "Order Done" ||
        order[0].orderStatus == "Order Cooking" //projede hata tespiti veya akış yap
      ) {
        dispatch(
          uiActions.showNotification({
            title: "Fail",
            message: `Your ${order[0].orderStatus} . You can't change order piece after this moment `,
            status: "error",
          })
        );
      } else
        dispatch(
          updateUserOrdersToDatabase(
            user,
            orders,
            "Order piece changed succesfully!"
          )
        );
    }
  }, [orders]);
  return (
    <div className="userOrders__backdrop">
      <div className="userOrders__modal">
        <div className="userOrders__modal--close" onClick={closeDetailModal}>
          X
        </div>
        {order[0].order.map((item) => (
          <div key={item.id} className="userOrders__items--wrapper">
            <div className="orderDetail__modal">
              <div className="orderDetail__modal--item">
                <img
                  src={`../../../../../images/${item.img}`}
                  alt={`images/${item.img}`}
                />
                <div className="orderDetail__modal--item-desc">
                  <div className="orderDetail__modal--item-desc-name">
                    {item.name}
                  </div>
                  <div className="orderDetail__modal--item-desc-desc">
                    {item.desc}
                  </div>

                  {item.removedIngredients?.map((removedIngredient) => (
                    <React.Fragment key={removedIngredient}>
                      <input
                        defaultChecked={true}
                        type="checkbox"
                        id={removedIngredient}
                        className="order__modal--item-ingredients-input"
                        name="ingredient"
                        value={removedIngredient}
                      />
                      <label
                        className="order__modal--item-ingredients-label"
                        htmlFor={removedIngredient}
                      >
                        {removedIngredient}
                      </label>
                    </React.Fragment>
                  ))}

                  {item.addedIngredients?.map((addedIngredient) => (
                    <React.Fragment key={addedIngredient}>
                      <input
                        defaultChecked={false}
                        type="checkbox"
                        id={addedIngredient}
                        className="order__modal--item-ingredients-input"
                        name="ingredient"
                        value={addedIngredient}
                      />
                      <label
                        className="order__modal--item-ingredients-label"
                        htmlFor={addedIngredient}
                      >
                        {addedIngredient}
                      </label>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="orderDetail__modal--item-detail">
                <select
                  onMouseEnter={(e) => (beforeChangePiece = e.target.value)}
                  onChange={(e) => quantityChangeHandler(e, item.id)}
                  defaultValue={item.piece}
                  className="orderDetail__modal--item-detail-piece order__item--piece"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <span className="orderDetail__modal--item-detail-price">
                  ${item.price}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="userOrders__items--total">
          <div className="userOrders__items--total-label">Total</div>
          <div className="userOrders__items--total-price">
            ${orderTotalPrice}
          </div>
        </div>
        <div className="userOrders__modal--buttons">
          <button type="submit" className="userOrders__modal--button click">
            CANCEL
          </button>
          <button
            onClick={modifyOrderHandler}
            type="submit"
            className="userOrders__modal--button click"
          >
            MODIFY
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
