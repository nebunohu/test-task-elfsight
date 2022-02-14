import styles from './character-card.module.css';

const CharacterCard = ({character}) => {
  return (
    <article className={`${styles.cardWrapper}`}>
      <img className={`${styles.cardImage}`} src={character.image} alt='' />
      <div className={`${styles.infoWrapper}`}>
        <ul>
          <li className={`${styles.characterName}`}>{character.name}</li>
          <li>{character.status}</li>
          <li>{character.species}</li>
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