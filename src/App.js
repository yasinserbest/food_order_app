import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import UserOrders from "./components/Orders/UserOrders/UserOrders.js";
import UserOrderDetailModal from "./components/Orders/UserOrders/UserOrderDetailModal.js";
import UserOrderFeedbackModal from "./components/Orders/UserOrders/UserOrderFeedbackModal.js";
import AdminOrders from "./components/Orders/AdminOrders/AdminOrders.js";
import TaskInfo from "./components/Orders/AdminOrders/TaskInfo.js";
import AddProduct from "./components/Products/AddProduct.js";
import Login from "./components/Login/Loginn.js";
import Notification from "./components/UI/Notification.js";
import { findCurrentUser } from "./store/user-slice";
import { fetchProducts } from "./store/products-slice";
import {
  fetchOrderFromDatabase,
  fetchAllOrdersToAdmin,
  updateUserOrdersToDatabase,
} from "./store/order-slice";

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const changeisInitialVariable = () => {
    isInitial = true;
    console.log("changed");
  };

  const [loginModal, setloginModal] = useState(false);

  const { isLoggedIn, email } = useSelector((state) => state.auth);

  const filter = useSelector((state) => state.products.filter);

  const { user } = useSelector((state) => state.users);

  const { orders } = useSelector((state) => state.orders);

  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(findCurrentUser(email));
  }, [isLoggedIn, email]); //bu kod reload yaptığında user'i tekrar almanı sağlıyor.

  useEffect(() => {
    dispatch(fetchProducts(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    if (user.role == "user") {
      //im checking if user exist and its role is not admin. otherwise don't fetch user's orders
      dispatch(fetchOrderFromDatabase(user.id));
    }
  }, [user]);

  useEffect(() => {
    if (user.role == "admin") {
      dispatch(fetchAllOrdersToAdmin());
    }
  }, [user]);

  const openLoginModal = () => {
    setloginModal(true);
  };
  const closeLoginModal = () => {
    setloginModal(false);
  };

  return (
    <div>
      <Navbar
        onOpenLoginModal={openLoginModal}
        onInitialChange={changeisInitialVariable}
      />
      <main>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          ></Notification>
        )}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {isLoggedIn && (
            <>
              <Route path="/userOrders/*" element={<UserOrders />}>
                <Route path=":orderId" element={<UserOrderDetailModal />} />
                <Route
                  path="feedback/:orderId"
                  element={<UserOrderFeedbackModal />}
                />
              </Route>
            </>
          )}
          {isLoggedIn && email == "admin@gmail.com" && (
            <>
              <Route
                path="/products/addProduct"
                element={<AddProduct />}
              ></Route>
              <Route path="/adminOrders/*" element={<AdminOrders />}>
                <Route path=":orderId" element={<TaskInfo />} />
              </Route>
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {loginModal && <Login onCloseLoginModal={closeLoginModal} />}
    </div>
  );
}

export default App;
