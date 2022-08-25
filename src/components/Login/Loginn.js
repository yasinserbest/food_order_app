import React, { useState, useRef, useEffect } from "react";
import "./Loginn.scss";
import ReactDOM from "react-dom"; //after react 18
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { addUser, findCurrentUser } from "../../store/user-slice";
import { uiActions } from "../../store/ui-slice";
import Backdrop from "../Modal/Backdrop";
import Modal from "../UI/Modal";

const Loginn = (props) => {
  const dipsatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const adressInputRef = useRef();
  const phoneInputRef = useRef();
  const nameInputRef = useRef();

  function hideNot() {
    dipsatch(uiActions.hideNotification());
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const enteredAdress = adressInputRef.current?.value || "";
    const enteredPhone = phoneInputRef.current?.value || "";
    const enteredName = nameInputRef.current?.value || "";

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA20FcCjVp6LVr6Drr8uypUIwW8GuXwWA8";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA20FcCjVp6LVr6Drr8uypUIwW8GuXwWA8";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToke: true,
      }),
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          //show success error
          return res.json();
        } else {
          res.json().then((data) => {
            let errorMessage = "Authentication Failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
              console.log(data);
            }

            dipsatch(
              uiActions.showNotification({
                message: errorMessage,
                title: `Authentication Failed! ${data.error.code}`,
                status: "error",
              })
            );
            //throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        dipsatch(
          authActions.loginHandler({ token: data.idToken, email: data.email })
        );
        if (!isLogin) {
          const user = {
            user: {
              email: data.email,
              role: "user",
              adress: enteredAdress || "",
              phone: enteredPhone || "",
              name: enteredName || "",
            },
            orders: {
              orders: "",
            },
          };
          addUser(user);
        }
        dipsatch(findCurrentUser(enteredEmail));
        props.onCloseLoginModal();
        dipsatch(
          uiActions.showNotification({
            title: "Login Successfuly!",
            status: "success",
          })
        );
        setTimeout(hideNot, 2000);
      })
      .catch((err) => {
        console.log(err.message);
        //alert(err.message)
      });
  };
  const htmlForLogin = (
    <>
      <div className="login__title">{isLogin ? "LOGIN" : "SIGN UP"}</div>
      <form className="login__form" onSubmit={submitHandler}>
        <div className="login__form--wrapper">
          <label className="login__form--label" htmlFor="email">
            Email
          </label>
          <input
            className="login__form--input"
            type="text"
            id="email"
            placeholder="someemail@email.com"
            ref={emailInputRef}
          ></input>
        </div>
        <div className="login__form--wrapper">
          <label className="login__form--label" htmlFor="password">
            Password
          </label>
          <input
            className="login__form--input"
            type="password"
            id="password"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            ref={passwordInputRef}
          ></input>
        </div>
        <button className="login__btn click">LOGIN</button>
        <span
          className="login__btn--createAccount"
          onClick={() => setIsLogin((prevState) => !prevState)}
        >
          Didn't have an account? Create account.
        </span>
      </form>
      <span onClick={props.onCloseLoginModal} className="login__btn--close">
        X
      </span>
    </>
  );
  const htmlForSignUp = (
    <>
      <div className="login__title">SIGN UP</div>
      <form className="login__form" onSubmit={submitHandler}>
        <div className="login__form--wrapper">
          <label className="login__form--label" htmlFor="email">
            Email
          </label>
          <input
            className="login__form--input"
            type="text"
            id="email"
            placeholder="someemail@email.com"
            ref={emailInputRef}
          ></input>
        </div>
        <div className="login__form--wrapper">
          <label className="login__form--label" htmlFor="password">
            Password
          </label>
          <input
            className="login__form--input"
            type="password"
            id="password"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            ref={passwordInputRef}
          ></input>
        </div>
        <div className="login__form--wrapper">
          <label className="login__form--label" htmlFor="password">
            Password Again
          </label>
          <input
            className="login__form--input"
            type="password"
            id="password"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          ></input>
        </div>
        <div className="login__form--wrapper">
          <label className="login__form--label" htmlFor="adress">
            Adress
          </label>
          <input
            className="login__form--input"
            type="text"
            id="adress"
            placeholder="xxx street, yyy number"
            ref={adressInputRef}
          ></input>
        </div>
        <div className="login__form--wrapper">
          <label className="login__form--label" htmlFor="phone">
            Phone
          </label>
          <input
            className="login__form--input"
            type="phone"
            id="phone"
            placeholder="564 235 32 43"
            ref={phoneInputRef}
          ></input>
        </div>
        <div className="login__form--wrapper">
          <label className="login__form--label" htmlFor="name">
            Name
          </label>
          <input
            className="login__form--input"
            type="text"
            id="name"
            placeholder="name surname"
            ref={nameInputRef}
          ></input>
        </div>
        <button className="login__btn click">SIGN UP</button>
        <span
          className="login__btn--createAccount"
          onClick={() => setIsLogin((prevState) => !prevState)}
        >
          Have you an account? Login here.
        </span>
      </form>
      <span onClick={props.onCloseLoginModal} className="login__btn--close">
        X
      </span>
    </>
  );
  return (
    <Modal onClose={props.onCloseLoginModal}>
      {isLogin ? htmlForLogin : htmlForSignUp}
    </Modal>
  );
};

export default Loginn;
