import { FC } from "react";

// Styles
import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  children: JSX.Element;
  closeModal: () => void;
}

const ModalOverlay: FC<TModalOverlayProps> = ({children, closeModal}) => {
  return (
    <div className={`${styles.wrapper}`} onClick={closeModal}>
      {children}
    </div>
  );
};

export default ModalOverlay;