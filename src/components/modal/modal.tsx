import { FC } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../app/modal-overlay/modal-overlay";

type TModal = {
  children: JSX.Element;
  closeModal: () => void;
};

const Modal: FC<TModal> = ({ children, closeModal }) => {
  const modalDiv = document.getElementById('modal-root');

  if(!modalDiv) return null;
  return ReactDOM.createPortal(
    <ModalOverlay closeModal={closeModal}>
      {children}
    </ModalOverlay>,
    modalDiv
  );
};

export default Modal;