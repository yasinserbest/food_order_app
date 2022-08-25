import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "./UserOrders.scss";
import UserOrder from "./UserOrder";
//import { fetchOrderFromDatabase } from "../../../store/order-slice";

const UserOrders = () => {
  const dispatch = useDispatch();

  // const userId = useSelector((state) => state.users.user.id);

  // useEffect(() => {
  //   dispatch(fetchOrderFromDatabase(userId));
  // }, []);

  const { orders } = useSelector((state) => state.orders);

  const openOrders = [];
  const closedOrders = [];

  orders.map((order) => {
    if (order.orderStatus !== "Order Done") {
      openOrders.push(order);
    } else closedOrders.push(order);
  });

  return (
    <section className="userOrders">
      <div className="heading--tertiary userOrders__heading">
        Current Orders
      </div>
      {openOrders.length !== 0 ? (
        <UserOrder products={openOrders} />
      ) : (
        <div>You have not open orders. Your all orders are done! </div>
      )}
      <div className="heading--tertiary userOrders__heading">
        Lastest's Orders
      </div>
      {closedOrders?.length !== 0 ? (
        <UserOrder products={closedOrders} />
      ) : (
        <div>You have not open orders. Your all orders are done! </div>
      )}

      <Outlet />
    </section>
  );
};

export default UserOrders;

//proje yolunda, düzeltmeleri yapıyosun, user da girişten sonra userOrdersDetailModal'i falan yap.
