import { createRef, FC, MouseEvent } from "react";

// Styles
import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  children: JSX.Element;
  closeModal: () => void;
}

const ModalOverlay: FC<TModalOverlayProps> = ({children, closeModal}) => {
  const ref = createRef<HTMLDivElement>();
  const onClickHandler = (event: MouseEvent<HTMLDivElement>) => {
    if(event.target === ref.current) closeModal();
  }
  return (
    <div className={`${styles.wrapper}`} ref={ref} onClick={onClickHandler}>
      {children}
    </div>
  );
};

export default ModalOverlay;