import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { motion, AnimatePresence } from "framer-motion";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import { BiDoorOpen, BiRightArrowAlt } from "react-icons/bi";
import "./Notification.scss";

const Notification = (props) => {
  const { notification } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const hideNotificationHandler = () => {
    dispatch(uiActions.hideNotification());
  };

  let status;
  let loginArrow;
  let loginDoor;

  if (props.status == "success") {
    status = <BsCheckCircleFill />;
  }
  if (props.status == "error") {
    status = <RiErrorWarningFill />;
  }
  if (props.status == "signIn") {
    loginArrow = <BiRightArrowAlt />;
    loginDoor = <BiDoorOpen />;
  }

  return (
    <AnimatePresence>
      {notification == null ? (
        ""
      ) : (
        <motion.div
          key="notification"
          initial={{ opacity: 0, y: "-70%", x: "-50%" }}
          animate={{
            opacity: 1,
            y: "-50%",
            transition: {
              duration: 0.5,
            },
          }}
          exit={{ opacity: 0, y: "-30%", transition: { duration: 0.5 } }}
          //        exit={{ y: "700%", opacity: 0, transition: { duration: 0.5 } }} doesn't work
          className="notification"
        >
          <div className="notification__title">{props.title}</div>
          <div className="notification__message">{props.message}</div>
          <div className="notification__buttons">
            <span
              className="notification__buttons--btn "
              onClick={hideNotificationHandler}
            >
              OK
            </span>
          </div>

          <motion.span
            animate={{ rotate: 360 }}
            transition={{
              delay: 1,
              duration: 0.5,
            }}
            className="notification__status"
          >
            {status}
          </motion.span>
          <motion.span
            animate={{ x: 25 }}
            transition={{
              repeat: Infinity,
              delay: 1.5,
              duration: 1,
            }}
            className="notification__status--loginArrow"
          >
            {loginArrow}
          </motion.span>

          <span className="notification__status--loginDoor">{loginDoor}</span>
        </motion.div>
      )}
      )
    </AnimatePresence>
  );
};

export default Notification;
