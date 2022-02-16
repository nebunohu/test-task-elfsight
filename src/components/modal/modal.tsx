import { FC, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "../../hooks";

// Components
import CloseIcon from '@mui/icons-material/Close';
import ModalOverlay from "../modal-overlay/modal-overlay";
import StatusMarker from "../status-marker/status-marker";

// Styles
import styles from './modal.module.css';
import { TCharacter } from "../../types/character-type";


type TModal = {
  //children: JSX.Element;
  closeModal: () => void;
};

const Modal: FC<TModal> = ({ closeModal }) => {
  const { currentCharacter } = useSelector(store => store.characters);
  const modalDiv = document.getElementById('modal-root');
  const [firstEpisode, setFirstEpisode] = useState('');
  
  const getEpisodeFor = async (character: TCharacter) => {
    try {
      const res = await fetch(character.episode[0], {method: 'GET', headers: {"content-type": "application/json"}})
      const data = await res.json();
      setFirstEpisode(data.name);
    } catch (error) {
      console.log(error);
    }
  }

  if(!modalDiv || !currentCharacter) return null;
  if(!firstEpisode) getEpisodeFor(currentCharacter);

  return ReactDOM.createPortal(
    <ModalOverlay closeModal={closeModal}>
      <div className={`${styles.wrapper}`}>
        <CloseIcon 
          classes={{
            colorPrimary: `${styles.closeIconColor}`,
            root: `${styles.closeIconRoot}`,
          }} 
          fontSize="large" 
          color="primary" 
          onClick={closeModal}
        />
        <div className={`${styles.modalCharacterName}`}>{currentCharacter.name}</div>
        <div className={`${styles.characterStatus}`}><StatusMarker status={currentCharacter.status} /> {currentCharacter.status} - {currentCharacter.species}</div>
        <img src={currentCharacter.image} alt='' />
        <ul>
          <li>Gender: {currentCharacter.location.name}</li>
          <li>Last known location: {currentCharacter.location.name}</li>
          <li>First seen in: {firstEpisode}</li>
        </ul>
      </div>
    </ModalOverlay>,
    modalDiv
  );
};

export default Modal;