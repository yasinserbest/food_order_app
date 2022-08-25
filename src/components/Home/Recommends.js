import React from "react";
import "./Recommends.scss";

import MealItem from "./MealItem";
const Recommends = (props) => {
  return (
    <section className="recommends">
      <div className="heading--tertiary recommends__heading">
        Our Recommends Foods
      </div>
      <div className="wrapper">
        <MealItem
          show={false}
          id={1658595123188}
          img="images/creamy-lemon-parmesan-chicken.png"
          name="Creamy Lemon Parmesan Chicken"
          desc="When it comes to weeknight dinners, this is what we dream of. It's simple, creamy, and so dang satisfying."
          price="32.99"
          openModal={props.onOpenModal}
        />
        <MealItem
          show={false}
          id={1658570224944}
          img="images/chicken-quesadilla.png"
          name="Chicken Quesadilla"
          desc="Traditionally, corn tortillas are used. But flour tortillas are also popular, especially in the states."
          price="25.99"
          openModal={props.onOpenModal}
        />
        <MealItem
          show={false}
          id={1658596520186}
          img="images/pizza.png"
          name="Supreme Pizza"
          desc="Once you make pizza this way, you'll never want to search for another pizza dough recipe. From Back Country To Back Patio, Camp Chef Is Your Way To ﻿Cook Outdoors."
          price="27.99"
          openModal={props.onOpenModal}
        />
        <MealItem
          show={false}
          id={1658655334412}
          img="images/limonlucheesecake.png"
          name="Lemon Cheescake"
          desc="Lemon Cheescake"
          price="14.99"
          openModal={props.onOpenModal}
        />
        <MealItem
          show={false}
          id={1658642655121}
          img="images/white-turkey.png"
          name="White Turkey and Poblano Chili"
          desc="Served up in a big dutch oven with all the fixin's, like diced avocado, sour cream, and lime wedges, this hearty stew will feed a crowd."
          price="35.99"
          openModal={props.onOpenModal}
        />
      </div>
    </section>
  );
};

export default Recommends;
