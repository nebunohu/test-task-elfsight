import { FC, MouseEvent } from 'react';
import StatusMarker from '../status-marker/status-marker';
import styles from './character-card.module.css';

type TCharacterCardProps = {
  character: any;
}

const CharacterCard: FC<TCharacterCardProps> = ({character}) => {
  const clickHandler = (event: MouseEvent<HTMLElement>) => {
  }
  return (
    <article className={`${styles.cardWrapper}`} onClick={clickHandler}>
      <img className={`${styles.cardImage}`} src={character.image} alt='' />
      <div className={`${styles.infoWrapper}`}>
        <ul>
          <li className={`${styles.characterName}`}>{character.name}</li>
          <li className={`${styles.characterStatus}`}><StatusMarker status={character.status} /> {character.status} - {character.species}</li>
          <li>{character.gender}</li>
          <li>{character.origin.name}</li>
          <li>{character.location.name}</li>
          <li>Type: {character.type ? character.type : 'Ordinary'}</li>
        </ul>
      </div>
    </article>
  );
};

export default CharacterCard;