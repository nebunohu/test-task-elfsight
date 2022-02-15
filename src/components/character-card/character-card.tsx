import { FC, MouseEvent } from 'react';
import { useDispatch } from '../../hooks';
import { setIsModalOpened } from '../../services/actions/app-actions';
import StatusMarker from '../status-marker/status-marker';
import styles from './character-card.module.css';

type TCharacterCardProps = {
  character: any;
}

const CharacterCard: FC<TCharacterCardProps> = ({character}) => {
  const dispatch = useDispatch();
  const clickHandler = (event: MouseEvent<HTMLElement>) => {
    dispatch(setIsModalOpened());
  }
  return (
    <article className={`${styles.cardWrapper}`} onClick={clickHandler}>
      <img className={`${styles.cardImage}`} src={character.image} alt='' />
      <div className={`${styles.infoWrapper}`}>
        <ul>
          <li className={`${styles.characterName}`}>{character.name}</li>
          <li className={`${styles.characterStatus}`}><StatusMarker status={character.status} /> {character.status} - {character.species}</li>
          <li>Last known location: {character.location.name}</li>
        </ul>
      </div>
    </article>
  );
};

export default CharacterCard;