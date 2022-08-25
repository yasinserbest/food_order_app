import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import Recommneds from "./Recommends";
import Meals from "./Meals";
import OrderModal from "./OrderModal";
import AddedToCard from "../UI/AddedToCard";
import "./Home.scss";
// import { fetchProducts } from "./store/products-slice"; //burdaydı app'e aldım. burda sürekli reload yapıyordu

const Home = () => {
  const [orderModal, setorderModal] = useState(false);

  const showOrderModal = () => {
    setorderModal(true);
  };
  const closeOrderModal = (e) => {
    {
      setorderModal(false);
    }
  };

  return (
    <div>
      <Header />
      <Recommneds onOpenModal={showOrderModal} />
      <Meals onOpenModal={showOrderModal} />
      {orderModal && (
        <OrderModal orderModal={orderModal} onCloseModal={closeOrderModal} />
      )}
      <AddedToCard />
    </div>
  );
};

export default Home;
