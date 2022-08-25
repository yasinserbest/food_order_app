import { Fragment } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClickClose}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClickClose={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};
export default Modal;
