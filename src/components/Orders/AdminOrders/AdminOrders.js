import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useParams, Link } from "react-router-dom";
import { IoMdDoneAll } from "react-icons/io";
import "./AdminOrders.scss";
// import {
//   orderActions,
//   updateOneOrderDatabase,
// } from "../../../store/order-slice";
// import { fetchAllOrdersToAdmin } from "../../../store/order-slice";

const AdminOrders = () => {
  const params = useParams();

  const dispatch = useDispatch();

  const { orderId } = params;
  const [taskInfoVisibility, setTaskInfoVisibility] = useState(true);

  //const [taskss, setTaskss] = useState([]);
  const { orders } = useSelector((state) => state.orders);

  // useEffect(() => {
  //   dispatch(fetchAllOrdersToAdmin());
  // }, []);

  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  // async function fetchTasks() {
  //   try {
  //     const response = await fetch(
  //       "https://troy-restaurant-default-rtdb.firebaseio.com/users.json"
  //     );

  //     if (!response.ok) {
  //       throw new Error("something went due tasks fetchs");
  //     }
  //     const data = await response.json();

  //     const loadedTasks = [];
  //     for (const user in data) {
  //       if (data[user].email !== "yasinserbest7@gmail.com") {
  //         data[user].orders?.map((item) => {
  //           if (item !== null) {
  //             loadedTasks.push(item);
  //           }
  //         });
  //       }
  //     }
  //     setTaskss(loadedTasks);
  //     dispatch(
  //       orderActions.loadOrders({
  //         orders: loadedTasks,
  //       })
  //     );
  //     console.log("a");

  //     //taskları listeliyosun admin ordersta, şimdi sıra tıkaldığında güzel navigate olması. unutma hala logout olduğunda orders state'ini sıfırlamıyor, önceki kullanıcıda kalıyor.
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  const taskInfoVisibilityHandler = () => {
    setTaskInfoVisibility(false);
  };
  return (
    <section className="adminOrders">
      <div className="adminOrders__tasks--container">
        <div className="tasks__dates">
          <span className="tasks__date tasks__date--active">Today</span>
          <span className="tasks__date">Last Week</span>
          <span className="tasks__date">All</span>
        </div>
        <div className="tasks">
          {orders.map((task) => (
            <Link
              key={task.orderId}
              to={`${task.orderId}`}
              className={
                task.orderId == orderId
                  ? "tasks__item tasks__item-active"
                  : "tasks__item"
              }
              onClick={taskInfoVisibilityHandler}
            >
              <div className="tasks__item--desc">
                <div className="tasks__item--desc-id">
                  Order ID: {task.orderId}
                </div>
                <div className="tasks__item--desc-date">{task.orderDate}</div>
              </div>
              <div
                className={
                  task.orderId == orderId
                    ? "tasks__item--price tasks__item--price-active"
                    : "tasks__item--price"
                }
              >
                ${task.orderTotalPrice}
              </div>
              {task.orderStatus === "Order Done" ? (
                <span className="tasks__item--done">
                  <IoMdDoneAll />
                </span>
              ) : (
                ""
              )}
            </Link>
          ))}
        </div>
      </div>
      {taskInfoVisibility && (
        <div className="adminOrders__note">
          Please click any task to view orders 🥰
        </div>
      )}
      <Outlet />
    </section>
  );
};

export default AdminOrders;
