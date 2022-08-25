import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoFastFood } from "react-icons/io5";
import {
  GiFriedEggs,
  GiWrappedSweet,
  GiChickenOven,
  GiForkKnifeSpoon,
} from "react-icons/gi";
import { motion } from "framer-motion";
import { BsCupStraw } from "react-icons/bs";
import "./Meals.scss";
import MealItem from "./MealItem";
import { productsActions } from "../../store/products-slice";
import ClipLoader from "react-spinners/ClipLoader";

const Meals = (props) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);

  return (
    <section className="section__meals">
      <div className="heading--tertiary ">Our Hot Meals</div>
      <div className="categories">
        <div
          className="category"
          onClick={() => dispatch(productsActions.producstsFilter("fast-food"))}
        >
          <div className="category__pic">
            <IoFastFood />
          </div>
          <div className="category__name">Fast Food</div>
        </div>
        <div
          className="category"
          onClick={() => dispatch(productsActions.producstsFilter("breakfast"))}
        >
          <div className="category__pic">
            <GiFriedEggs />
          </div>
          <div className="category__name">Breakfast</div>
        </div>
        <div
          className="category"
          onClick={() => dispatch(productsActions.producstsFilter("desert"))}
        >
          <div className="category__pic">
            <GiWrappedSweet />
          </div>
          <div className="category__name">Deserts</div>
        </div>
        <div
          className="category"
          onClick={() =>
            dispatch(productsActions.producstsFilter("soft-drink"))
          }
        >
          <div className="category__pic">
            <BsCupStraw style={{ position: "relative", left: "3px" }} />
          </div>
          <div className="category__name">Soft Drinks</div>
        </div>
        <div
          className="category"
          onClick={() => dispatch(productsActions.producstsFilter("chicken"))}
        >
          <div className="category__pic">
            <GiChickenOven />
          </div>
          <div className="category__name">Chicken</div>
        </div>
        <div
          className="category"
          onClick={() => dispatch(productsActions.producstsFilter("dinner"))}
        >
          <div className="category__pic">
            <GiForkKnifeSpoon />
          </div>
          <div className="category__name">Dinner</div>
        </div>
      </div>
      <div className="meals">
        {products.map((product) => (
          <MealItem
            key={product.id}
            id={product.id}
            img={`images/${product.img}`}
            optionalIngredients={product.optionalIngredients}
            name={product.name}
            desc={product.desc}
            price={product.price}
            openModal={props.onOpenModal}
          />
        ))}
      </div>
    </section>
  );
};

export default Meals;
