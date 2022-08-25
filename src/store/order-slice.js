import { createSlice, current } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { uiActions } from "../store/ui-slice";
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {
    checkoutCard(state, action) {
      const nowa = new Date();
      const options = {
        hour: "numeric",
        minute: "numeric",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      const date = new Intl.DateTimeFormat("en-US", options).format(nowa);
      state.orders.push({
        order: action.payload.cardItem,
        orderId: nanoid(),
        orderStatus: "Order Received",
        orderDate: date,
        orderTotalPrice: action.payload.totalPrice,
        orderTotalQuantity: action.payload.totalQuantity,
        user: action.payload.user,
      });
    },
    // addFeedbackToOrder(state, action) {
    //   const id = action.payload.orderId;
    //   const order = state.orders.find((order) => order.orderId == id);
    //   order.orderFeedback = action.payload.feedback;
    // },
    modifyOrder(state, action) {
      const newPieces = action.payload.newPieces;
      const id = action.payload.orderId;
      const order = state.orders.find((item) => item.orderId == id);
      let orderTotalPriceNew = 0;
      let orderTotalPieceNew = 0;
      order.order.map((item, i) => {
        item.piece = Number(newPieces[i]);
        item.itemTotalPrice = item.piece * item.price;
        orderTotalPriceNew += item.itemTotalPrice;
        orderTotalPieceNew += Number(item.piece);
      });
      order.orderTotalPrice = orderTotalPriceNew;
      order.orderTotalQuantity = orderTotalPieceNew;
    },
    // changeOrderStatus(state, action) {
    //   const id = action.payload.orderId;
    //   const openOrder = state.openOrders.find(
    //     (openOrder) => openOrder.orderId == id
    //   );
    //   if (action.payload.orderStatus !== "Order Done") {
    //     openOrder.orderStatus = action.payload.orderStatus;
    //   } else {
    //     state.openOrders = state.openOrders.filter(
    //       (openOrder) => openOrder.orderId != id
    //     );
    //     openOrder.orderStatus = action.payload.orderStatus;
    //     state.closedOrders.push(openOrder);
    //   }
    // },
    loadOrders(state, action) {
      state.orders = action.payload?.orders;
    },
    deleteOrders(state) {
      state.orders = [];
    },
  },
});

export const updateOneOrderDatabase = (orderIndex, userId, order, message) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://troy-restaurant-default-rtdb.firebaseio.com/users/${userId}/orders/${orderIndex}.json`,
        {
          method: "PUT",
          body: JSON.stringify(order),
        }
      );
      if (!response.ok) {
        throw new Error("Order status didn't update");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          title: "Updated Successfully",
          message: message,
          status: "success",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          title: `ERROR 404`,
          message: `${err}`,
          status: "error",
        })
      );
    }
  };
};

export const updateUserOrdersToDatabase = (user, orders, message) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://troy-restaurant-default-rtdb.firebaseio.com/users/${user.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            user: user,
            orders,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Order didn't send to database");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          title: `OK`,
          message,
          status: "success",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          title: `ERROR 404`,
          message: `${err}`,
          status: "error",
        })
      );
    }
  };
};

export const fetchOrderFromDatabase = (userId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://troy-restaurant-default-rtdb.firebaseio.com/users/${userId}/orders.json`
      );
      if (!response.ok) {
        throw new Error("Couldnt fetch cart daata!");
      }
      const data = await response.json();
      let newData = [];
      data.map((item) => {
        if (item !== null) {
          newData.push(item);
        }
      });
      return newData;
    };
    try {
      const orders = await fetchData();
      dispatch(
        orderActions.loadOrders({
          orders: orders || [],
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchAllOrdersToAdmin = () => {
  return async (dispatch) => {
    const fetchOrders = async () => {
      const response = await fetch(
        "https://troy-restaurant-default-rtdb.firebaseio.com/users.json"
      );
      if (!response.ok) {
        throw new Error("something went due tasks fetchs!");
      }
      const data = await response.json();

      console.log(data);

      const adminOrders = [];
      for (const user in data) {
        if (data[user].user.email !== "admin@gmail.com") {
          data[user].orders?.map((item) => {
            if (item !== null || item !== "") {
              adminOrders.push(item);
            }
          });
        }
      }
      return adminOrders;
    };
    try {
      const data = await fetchOrders();
      dispatch(
        orderActions.loadOrders({
          orders: data || [],
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const orderActions = orderSlice.actions;
export default orderSlice;
